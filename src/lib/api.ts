import { Member, Event, CarouselItem } from "@/data/dummyData";
import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Placeholder image URLs
const MEMBER_PLACEHOLDER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"; // Default profile photo
const EVENT_PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87"; // Default event image
const CAROUSEL_PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"; // Default carousel image

// Helper function to handle Firebase errors
const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);
  if (error.code === "unavailable") {
    throw new Error("Network unavailable. Please check your internet connection.");
  } else if (error.code === "permission-denied") {
    throw new Error("Permission denied. Please ensure you are authenticated and have access.");
  } else if (error.code === "invalid-argument") {
    throw new Error("Invalid data provided to Firestore. Ensure all fields are valid (e.g., no undefined values).");
  } else if (error.message?.includes("cors") || error.message?.includes("CORS")) {
    throw new Error("CORS error. Ensure Firebase Storage is configured to allow requests from http://localhost:8080. See https://cloud.google.com/storage/docs/configuring-cors");
  }
  throw new Error(`Firebase operation failed: ${error.message}`);
};

// API for Members (using Firebase Firestore and Storage for optional photos)
export const fetchMembers = async (): Promise<Member[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "members"));
    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
      members.push({ id: doc.id, ...doc.data() } as Member);
    });
    return members;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const addMember = async (member: Omit<Member, 'id'> & { imageFile?: File }): Promise<Member> => {
  try {
    let photoUrl = MEMBER_PLACEHOLDER_PHOTO;
    if (member.imageFile) {
      const storageRef = ref(storage, `photos/members/${Date.now()}_${member.imageFile.name}`);
      await uploadBytes(storageRef, member.imageFile);
      photoUrl = await getDownloadURL(storageRef);
    }
    const newMember: Omit<Member, 'id'> = { 
      ...member, 
      photo: photoUrl
    };
    // Explicitly remove imageFile and filter undefined values
    const cleanMember = Object.fromEntries(
      Object.entries(newMember).filter(([key, value]) => key !== 'imageFile' && value !== undefined)
    ) as Omit<Member, 'id'>;
    const docRef = await addDoc(collection(db, "members"), cleanMember);
    return { ...cleanMember, id: docRef.id };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const updateMember = async (id: string, member: Partial<Member> & { imageFile?: File }): Promise<Member> => {
  try {
    const memberRef = doc(db, "members", id);
    const memberDoc = await getDoc(memberRef);
    if (!memberDoc.exists()) throw new Error("Member not found");

    let updatedPhoto = memberDoc.data().photo || MEMBER_PLACEHOLDER_PHOTO;
    if (member.imageFile) {
      if (updatedPhoto && !updatedPhoto.includes("unsplash.com")) {
        const oldPhotoRef = ref(storage, updatedPhoto);
        await deleteObject(oldPhotoRef).catch((err) => console.error("Error deleting old photo:", err));
      }
      const storageRef = ref(storage, `photos/members/${Date.now()}_${member.imageFile.name}`);
      await uploadBytes(storageRef, member.imageFile);
      updatedPhoto = await getDownloadURL(storageRef);
    } else if (member.photo === null) {
      updatedPhoto = MEMBER_PLACEHOLDER_PHOTO; // Reset to placeholder if explicitly cleared
    }

    const updatedMember = { 
      ...member, 
      photo: updatedPhoto
    };
    // Explicitly remove imageFile and filter undefined values
    const cleanMember = Object.fromEntries(
      Object.entries(updatedMember).filter(([key, value]) => key !== 'imageFile' && value !== undefined)
    ) as Partial<Member>;
    await updateDoc(memberRef, cleanMember);
    return { id, ...memberDoc.data(), ...cleanMember } as Member;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const deleteMember = async (id: string): Promise<void> => {
  try {
    const memberRef = doc(db, "members", id);
    const memberDoc = await getDoc(memberRef);
    if (!memberDoc.exists()) throw new Error("Member not found");

    const photoUrl = memberDoc.data().photo;
    if (photoUrl && !photoUrl.includes("unsplash.com")) {
      const photoRef = ref(storage, photoUrl);
      await deleteObject(photoRef).catch((err) => console.error("Error deleting photo:", err));
    }

    await deleteDoc(memberRef);
  } catch (error) {
    handleFirebaseError(error);
  }
};

// API for Events (using Firebase Firestore and Storage)
export const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const addEvent = async (event) => {
  try {
    let imageUrls = [EVENT_PLACEHOLDER_IMAGE];
    if (event.imageFiles && event.imageFiles.length > 0) {
      imageUrls = await Promise.all(
        event.imageFiles.map(async (file) => {
          const storageRef = ref(storage, `photos/events/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
    }
    const newEvent = { 
      ...event, 
      images: imageUrls
    };
    const cleanEvent = Object.fromEntries(
      Object.entries(newEvent).filter(([key, value]) => key !== 'imageFiles' && value !== undefined)
    );
    const docRef = await addDoc(collection(db, "events"), cleanEvent);
    return { ...cleanEvent, id: docRef.id };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const updateEvent = async (id, event) => {
  try {
    const eventRef = doc(db, "events", id);
    const eventDoc = await getDoc(eventRef);
    if (!eventDoc.exists()) throw new Error("Event not found");

    let updatedImages = eventDoc.data().images || [EVENT_PLACEHOLDER_IMAGE];

    // Identify images to remove by comparing event.images with existing images
    const providedImages = event.images || [];
    const removedImages = updatedImages.filter(
      (url) => !providedImages.includes(url) && !url.includes("unsplash.com")
    );

    // Delete removed images from storage
    if (removedImages.length > 0) {
      await Promise.all(
        removedImages.map(async (url) => {
          const oldImageRef = ref(storage, url);
          await deleteObject(oldImageRef).catch((err) => console.error("Error deleting removed image:", err));
        })
      );
    }

    // Start with the provided images (remaining ones after removal)
    updatedImages = providedImages.filter((url) => url !== EVENT_PLACEHOLDER_IMAGE);

    // Upload new images if provided
    if (event.imageFiles && event.imageFiles.length > 0) {
      const newImageUrls = await Promise.all(
        event.imageFiles.map(async (file) => {
          const storageRef = ref(storage, `photos/events/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
      updatedImages = [...updatedImages, ...newImageUrls];
    }

    // If no images remain, use placeholder
    if (updatedImages.length === 0) {
      updatedImages = [EVENT_PLACEHOLDER_IMAGE];
    }

    const updatedEvent = {
      ...event,
      images: updatedImages,
    };
    const cleanEvent = Object.fromEntries(
      Object.entries(updatedEvent).filter(([key, value]) => key !== "imageFiles" && value !== undefined)
    );

    await updateDoc(eventRef, cleanEvent);
    const updatedDoc = await getDoc(eventRef); // Fetch updated doc to ensure consistency
    return { id, ...updatedDoc.data() };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const eventRef = doc(db, "events", id);
    const eventDoc = await getDoc(eventRef);
    if (!eventDoc.exists()) throw new Error("Event not found");

    const imageUrls = eventDoc.data().images || [];
    if (imageUrls.length > 0 && !imageUrls.every(url => url.includes("unsplash.com"))) {
      await Promise.all(
        imageUrls.map(async (url) => {
          if (!url.includes("unsplash.com")) {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef).catch((err) => console.error("Error deleting image:", err));
          }
        })
      );
    }

    await deleteDoc(eventRef);
  } catch (error) {
    handleFirebaseError(error);
  }
};

// API for Carousel (using Firebase Firestore and Storage)
export const fetchCarouselItems = async (): Promise<CarouselItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "carouselItems"));
    const items: CarouselItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as CarouselItem);
    });
    return items;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const addCarouselItem = async (item: Omit<CarouselItem, 'id'> & { imageFile?: File }): Promise<CarouselItem> => {
  try {
    let imageUrl = item.image || CAROUSEL_PLACEHOLDER_IMAGE;
    if (item.imageFile) {
      const storageRef = ref(storage, `photos/carousel/${Date.now()}_${item.imageFile.name}`);
      await uploadBytes(storageRef, item.imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    const newItem: Omit<CarouselItem, 'id'> = { 
      ...item, 
      image: imageUrl
    };
    const cleanItem = Object.fromEntries(
      Object.entries(newItem).filter(([key, value]) => key !== 'imageFile' && value !== undefined)
    ) as Omit<CarouselItem, 'id'>;
    const docRef = await addDoc(collection(db, "carouselItems"), cleanItem);
    return { ...cleanItem, id: docRef.id };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const updateCarouselItem = async (id: string, item: Partial<CarouselItem> & { imageFile?: File }): Promise<CarouselItem> => {
  try {
    const itemRef = doc(db, "carouselItems", id);
    const itemDoc = await getDoc(itemRef);
    if (!itemDoc.exists()) throw new Error("Carousel item not found");

    let updatedImage = itemDoc.data().image || CAROUSEL_PLACEHOLDER_IMAGE;
    if (item.imageFile) {
      if (updatedImage && !updatedImage.includes("unsplash.com")) {
        const oldImageRef = ref(storage, updatedImage);
        await deleteObject(oldImageRef).catch((err) => console.error("Error deleting old image:", err));
      }
      const storageRef = ref(storage, `photos/carousel/${Date.now()}_${item.imageFile.name}`);
      await uploadBytes(storageRef, item.imageFile);
      updatedImage = await getDownloadURL(storageRef);
    } else if (item.image === null) {
      updatedImage = CAROUSEL_PLACEHOLDER_IMAGE;
    }

    const updatedItem = { 
      ...item, 
      image: updatedImage
    };
    const cleanItem = Object.fromEntries(
      Object.entries(updatedItem).filter(([key, value]) => key !== 'imageFile' && value !== undefined)
    ) as Partial<CarouselItem>;
    await updateDoc(itemRef, cleanItem);
    return { id, ...itemDoc.data(), ...cleanItem } as CarouselItem;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const deleteCarouselItem = async (id: string): Promise<void> => {
  try {
    const itemRef = doc(db, "carouselItems", id);
    const itemDoc = await getDoc(itemRef);
    if (!itemDoc.exists()) throw new Error("Carousel item not found");

    const imageUrl = itemDoc.data().image;
    if (imageUrl && !imageUrl.includes("unsplash.com")) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch((err) => console.error("Error deleting image:", err));
    }

    await deleteDoc(itemRef);
  } catch (error) {
    handleFirebaseError(error);
  }
};