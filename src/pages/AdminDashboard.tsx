import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Calendar, Image, Plus, Edit, Trash2, Save } from "lucide-react";
import { dummyMembers, dummyEvents, carouselItems, type Member, type Event, type CarouselItem } from "@/data/dummyData";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [members, setMembers] = useState<Member[]>(dummyMembers);
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [carousel, setCarousel] = useState<CarouselItem[]>(carouselItems);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" });
  const { toast } = useToast();

  // Simple admin authentication (for demo purposes)
  const handleLogin = () => {
    if (adminCredentials.username === "admin" && adminCredentials.password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use admin/admin123 for demo.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminCredentials({ username: "", password: "" });
  };

  // Member Management
  const [newMember, setNewMember] = useState<Partial<Member>>({
    name: "",
    address: "",
    aadharNumber: "",
    photo: "",
    occupation: "",
    mobileNo: "",
    gender: "Male",
    joinDate: new Date().toISOString().split('T')[0]
  });

  const addMember = () => {
    if (newMember.name && newMember.address && newMember.mobileNo) {
      const member: Member = {
        ...newMember as Member,
        id: Date.now().toString()
      };
      setMembers([...members, member]);
      setNewMember({
        name: "",
        address: "",
        aadharNumber: "",
        photo: "",
        occupation: "",
        mobileNo: "",
        gender: "Male",
        joinDate: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Member Added",
        description: "New member has been successfully added to the trust.",
      });
    }
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast({
      title: "Member Removed",
      description: "Member has been removed from the trust.",
    });
  };

  // Event Management
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    venue: "",
    images: [],
    category: "future",
    beneficiaries: 0
  });

  const addEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.date && newEvent.venue) {
      const event: Event = {
        ...newEvent as Event,
        id: Date.now().toString(),
        images: newEvent.images || ["https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop"]
      };
      setEvents([...events, event]);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        venue: "",
        images: [],
        category: "future",
        beneficiaries: 0
      });
      toast({
        title: "Event Added",
        description: "New event has been successfully added.",
      });
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event Removed",
      description: "Event has been removed from the list.",
    });
  };

  // Carousel Management
  const [newCarouselItem, setNewCarouselItem] = useState<Partial<CarouselItem>>({
    title: "",
    description: "",
    image: "",
    link: ""
  });

  const addCarouselItem = () => {
    if (newCarouselItem.title && newCarouselItem.description && newCarouselItem.image) {
      const item: CarouselItem = {
        ...newCarouselItem as CarouselItem,
        id: Date.now().toString()
      };
      setCarousel([...carousel, item]);
      setNewCarouselItem({
        title: "",
        description: "",
        image: "",
        link: ""
      });
      toast({
        title: "Carousel Item Added",
        description: "New carousel item has been successfully added.",
      });
    }
  };

  const deleteCarouselItem = (id: string) => {
    setCarousel(carousel.filter(item => item.id !== id));
    toast({
      title: "Carousel Item Removed",
      description: "Carousel item has been removed.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-warm">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
            <p className="text-muted-foreground">Enter your credentials to access the dashboard</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={adminCredentials.username}
                onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" variant="divine">
              Login to Dashboard
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: admin / admin123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your trust's members, events, and content</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{members.length}</p>
                  <p className="text-muted-foreground">Total Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{events.length}</p>
                  <p className="text-muted-foreground">Total Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Image className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{carousel.length}</p>
                  <p className="text-muted-foreground">Carousel Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Member</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    value={newMember.mobileNo}
                    onChange={(e) => setNewMember({...newMember, mobileNo: e.target.value})}
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input
                    id="aadhar"
                    value={newMember.aadharNumber}
                    onChange={(e) => setNewMember({...newMember, aadharNumber: e.target.value})}
                    placeholder="XXXX-XXXX-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={newMember.occupation}
                    onChange={(e) => setNewMember({...newMember, occupation: e.target.value})}
                    placeholder="Occupation"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={newMember.gender} onValueChange={(value) => setNewMember({...newMember, gender: value as "Male" | "Female" | "Other"})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="photo">Photo URL</Label>
                  <Input
                    id="photo"
                    value={newMember.photo}
                    onChange={(e) => setNewMember({...newMember, photo: e.target.value})}
                    placeholder="Profile photo URL"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={newMember.address}
                    onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                    placeholder="Full address"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={addMember} className="w-full" variant="divine">
                    <Save className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Members ({members.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={member.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"} 
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-foreground">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.occupation} • {member.mobileNo}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteMember(member.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Event</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDate">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="eventVenue">Venue</Label>
                  <Input
                    id="eventVenue"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    placeholder="Event venue"
                  />
                </div>
                <div>
                  <Label htmlFor="eventCategory">Category</Label>
                  <Select value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value as "past" | "future"})}>
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
                    onChange={(e) => setNewEvent({...newEvent, beneficiaries: parseInt(e.target.value)})}
                    placeholder="Number of people benefited"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea
                    id="eventDescription"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Event description"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={addEvent} className="w-full" variant="divine">
                    <Save className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Events ({events.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={event.images[0]} 
                          alt={event.title}
                          className="w-16 h-12 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.venue}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            event.category === 'past' ? 'bg-secondary/20 text-secondary' : 'bg-success/20 text-success'
                          }`}>
                            {event.category === 'past' ? 'Completed' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carousel Tab */}
          <TabsContent value="carousel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Carousel Item</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carouselTitle">Title</Label>
                  <Input
                    id="carouselTitle"
                    value={newCarouselItem.title}
                    onChange={(e) => setNewCarouselItem({...newCarouselItem, title: e.target.value})}
                    placeholder="Carousel item title"
                  />
                </div>
                <div>
                  <Label htmlFor="carouselImage">Image URL</Label>
                  <Input
                    id="carouselImage"
                    value={newCarouselItem.image}
                    onChange={(e) => setNewCarouselItem({...newCarouselItem, image: e.target.value})}
                    placeholder="Image URL"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="carouselDescription">Description</Label>
                  <Textarea
                    id="carouselDescription"
                    value={newCarouselItem.description}
                    onChange={(e) => setNewCarouselItem({...newCarouselItem, description: e.target.value})}
                    placeholder="Description"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={addCarouselItem} className="w-full" variant="divine">
                    <Save className="w-4 h-4 mr-2" />
                    Add Carousel Item
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Carousel Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Carousel Items ({carousel.length})</CardTitle>
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
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCarouselItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;