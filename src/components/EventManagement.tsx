import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Event } from "@/data/dummyData";
import { useToast } from "@/hooks/use-toast";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "@/lib/api";

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState<Partial<Event> & { imageFiles?: File[] }>({
    title: "",
    description: "",
    date: "",
    venue: "",
    images: [],
    imageFiles: [],
    category: "future",
    beneficiaries: 0,
  });
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch events.",
          variant: "destructive",
        });
      }
      setLoading(false)
    };
    loadEvents();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewEvent({
        ...newEvent,
        imageFiles: [...(newEvent.imageFiles || []), ...files],
      });
    }
  };

  const removeImage = (index: number, type: "file" | "existing") => {
    if (type === "file") {
      const newFiles = newEvent.imageFiles?.filter((_, i) => i !== index) || [];
      setNewEvent({
        ...newEvent,
        imageFiles: newFiles,
      });
    } else if (type === "existing") {
      const newImages = newEvent.images?.filter((_, i) => i !== index) || [];
      setNewEvent({
        ...newEvent,
        images: newImages,
      });
    }
  };

  const addNewEvent = async () => {
    setLoading(true)
    if (newEvent.title && newEvent.description && newEvent.date && newEvent.venue) {
      try {
        const event = await addEvent(newEvent as Event & { imageFiles?: File[] });
        setEvents([...events, event]);
        // Clean up preview URLs
        newEvent.imageFiles?.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
        setNewEvent({
          title: "",
          description: "",
          date: "",
          venue: "",
          images: [],
          imageFiles: [],
          category: "future",
          beneficiaries: 0,
        });
        toast({
          title: "Event Added",
          description: "New event has been successfully added.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add event.",
          variant: "destructive",
        });
      }
      
    }
    setLoading(false)
  };

  const startEditing = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      ...event,
      imageFiles: [],
    });
  };

  const saveEdit = async () => {
    setLoading(true)
    if (editingEvent && newEvent.title && newEvent.description && newEvent.date && newEvent.venue) {
      try {
        const updatedEvent = await updateEvent(editingEvent.id, newEvent);
        setEvents(events.map((e) => (e.id === editingEvent.id ? updatedEvent : e)));
        // Clean up preview URLs
        newEvent.imageFiles?.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
        setEditingEvent(null);
        setNewEvent({
          title: "",
          description: "",
          date: "",
          venue: "",
          images: [],
          imageFiles: [],
          category: "future",
          beneficiaries: 0,
        });
        toast({
          title: "Event Updated",
          description: "Event details have been updated.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update event.",
          variant: "destructive",
        });
      }
    }
    setLoading(false)
  };

  const cancelEdit = () => {
    // Clean up preview URLs
    newEvent.imageFiles?.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    setEditingEvent(null);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      venue: "",
      images: [],
      imageFiles: [],
      category: "future",
      beneficiaries: 0,
    });
  };

  const removeEvent = async (id: string) => {
    setLoading(true)
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
      toast({
        title: "Event Removed",
        description: "Event has been removed from the list.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove event.",
        variant: "destructive",
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
            <span>{editingEvent ? "Edit Event" : "Add New Event"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="eventTitle">Event Title</Label>
            <Input
              id="eventTitle"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Event title"
            />
          </div>
          <div>
            <Label htmlFor="eventDate">Date</Label>
            <Input
              id="eventDate"
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="eventVenue">Venue</Label>
            <Input
              id="eventVenue"
              value={newEvent.venue}
              onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
              placeholder="Event venue"
            />
          </div>
          <div>
            <Label htmlFor="eventCategory">Category</Label>
            <Select
              value={newEvent.category}
              onValueChange={(value) => setNewEvent({ ...newEvent, category: value as "past" | "future" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="future">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="beneficiaries">Beneficiaries</Label>
            <Input
              id="beneficiaries"
              type="number"
              value={newEvent.beneficiaries}
              onChange={(e) => setNewEvent({ ...newEvent, beneficiaries: parseInt(e.target.value) })}
              placeholder="Number of people benefited"
            />
          </div>
          <div>
            <Label htmlFor="eventImages">Images</Label>
            <Input
              id="eventImages"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {(newEvent.imageFiles?.length || 0) > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {newEvent.imageFiles?.map((file, index) => (
                  <div key={`file-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 h-6 w-6"
                      onClick={() => removeImage(index, "file")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {editingEvent && (newEvent.images?.length || 0) > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {newEvent.images?.map((img, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`Event image ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 h-6 w-6"
                      onClick={() => removeImage(index, "existing")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="eventDescription">Description</Label>
            <Textarea
              id="eventDescription"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Event description"
            />
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <Button
              onClick={editingEvent ? saveEdit : addNewEvent}
              className="w-full"
              variant="divine"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingEvent ? "Save Changes" : "Add Event"}
            </Button>
            {editingEvent && (
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
            <Calendar className="w-5 h-5" />
            <span>Current Events ({events.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    {event.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${event.title} ${index + 1}`}
                        className="w-16 h-12 rounded object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} • {event.venue}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        event.category === "past" ? "bg-secondary/20 text-secondary" : "bg-success/20 text-success"
                      }`}
                    >
                      {event.category === "past" ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => startEditing(event)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeEvent(event.id)}>
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

export default EventManagement;