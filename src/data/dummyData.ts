export type Member = {
  id: string;
  name: string;
  address: string;
  aadharNumber: string;
  photo: string;
  occupation: string;
  mobileNo: string;
  gender: "Male" | "Female" | "Other";
  joinDate: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  images: string[];
  category: "past" | "future";
  beneficiaries: number;
};

export type CarouselItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

export const dummyMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main St, City",
    aadharNumber: "1234-5678-9012",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    occupation: "Engineer",
    mobileNo: "+91-9876543210",
    gender: "Male",
    joinDate: "2023-01-15"
  },
  // Add more dummy members as needed
];

export const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Community Clean-Up",
    description: "A community-driven initiative to clean the local park.",
    date: "2023-06-20",
    venue: "Central Park",
    images: ["https://images.unsplash.com/photo-1593113598332-cd288d649433"],
    category: "past",
    beneficiaries: 50
  },
  // Add more dummy events as needed
];

export const carouselItems: CarouselItem[] = [
  {
    id: "1",
    title: "Welcome to Our Trust",
    description: "Join us in making a difference in the community!",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    link: "/about"
  },
  // Add more carousel items as needed
];