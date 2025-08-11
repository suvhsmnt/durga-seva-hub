import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image, Plus, Edit, Trash2, Save } from "lucide-react";
import { CarouselItem } from "@/data/dummyData";
import { useToast } from "@/hooks/use-toast";
import { fetchCarouselItems, addCarouselItem, updateCarouselItem, deleteCarouselItem } from "@/lib/api";

const CarouselManagement = () => {
  const [carousel, setCarousel] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCarouselItem, setNewCarouselItem] = useState<Partial<CarouselItem>>({
    title: "",
    description: "",
    image: "",
    link: ""
  });
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadCarouselItems = async () => {
      try {
        const data = await fetchCarouselItems();
        setCarousel(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch carousel items.",
          variant: "destructive"
        });
      }
       setLoading(false)
    };
    loadCarouselItems();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewCarouselItem({ ...newCarouselItem, image: reader.result as string });
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read image file.",
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewCarouselItem = async () => {
    setLoading(true)
    if (newCarouselItem.title && newCarouselItem.description && newCarouselItem.image) {
      try {
        const item = await addCarouselItem(newCarouselItem as CarouselItem);
        setCarousel([...carousel, item]);
        setNewCarouselItem({
          title: "",
          description: "",
          image: "",
          link: ""
        });
        toast({
          title: "Carousel Item Added",
          description: "New carousel item has been successfully added."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add carousel item.",
          variant: "destructive"
        });
      }
      setLoading(false)
    }
  };

  const startEditing = (item: CarouselItem) => {
    setEditingItem(item);
    setNewCarouselItem(item);
  };

  const saveEdit = async () => {
    setLoading(true)
    if (editingItem && newCarouselItem.title && newCarouselItem.description && newCarouselItem.image) {
      try {
        const updatedItem = await updateCarouselItem(editingItem.id, newCarouselItem);
        setCarousel(carousel.map(c => c.id === editingItem.id ? updatedItem : c));
        setEditingItem(null);
        setNewCarouselItem({
          title: "",
          description: "",
          image: "",
          link: ""
        });
        toast({
          title: "Carousel Item Updated",
          description: "Carousel item details have been updated."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update carousel item.",
          variant: "destructive"
        });
      }
      setLoading(false)
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewCarouselItem({
      title: "",
      description: "",
      image: "",
      link: ""
    });
  };

  const removeCarouselItem = async (id: string) => {
    setLoading(true)
    try {
      await deleteCarouselItem(id);
      setCarousel(carousel.filter(item => item.id !== id));
      toast({
        title: "Carousel Item Removed",
        description: "Carousel item has been removed."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove carousel item.",
        variant: "destructive"
      });
    }
    setLoading(false)
  };

  return (
    <div className="space-y-6">
       {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>{editingItem ? "Edit Carousel Item" : "Add Carousel Item"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="carouselTitle">Title</Label>
            <Input
              id="carouselTitle"
              value={newCarouselItem.title}
              onChange={(e) => setNewCarouselItem({ ...newCarouselItem, title: e.target.value })}
              placeholder="Carousel item title"
            />
          </div>
          <div>
            <Label htmlFor="carouselImage">Upload Image</Label>
            <Input
              id="carouselImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {newCarouselItem.image && (
              <img
                src={newCarouselItem.image}
                alt="Preview"
                className="mt-2 w-20 h-12 rounded object-cover"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="carouselDescription">Description</Label>
            <Textarea
              id="carouselDescription"
              value={newCarouselItem.description}
              onChange={(e) => setNewCarouselItem({ ...newCarouselItem, description: e.target.value })}
              placeholder="Description"
            />
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <Button 
              onClick={editingItem ? saveEdit : addNewCarouselItem} 
              className="w-full" 
              variant="divine"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? "Save Changes" : "Add Carousel Item"}
            </Button>
            {editingItem && (
              <Button 
                onClick={cancelEdit} 
                className="w-full" 
                variant="outline"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Carousel Items ({carousel.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {carousel.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-20 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => startEditing(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeCarouselItem(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselManagement;