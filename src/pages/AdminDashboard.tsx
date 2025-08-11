import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Calendar, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchMembers, fetchEvents, fetchCarouselItems } from "@/lib/api";
import MemberManagement from "../components/MemberManagement";
import EventManagement from "../components/EventManagement";
import CarouselManagement from "../components/CarouselManagement";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" });
  const [membersCount, setMembersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [carouselCount, setCarouselCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [members, events, carouselItems] = await Promise.all([
          fetchMembers(),
          fetchEvents(),
          fetchCarouselItems()
        ]);
        setMembersCount(members.length);
        setEventsCount(events.length);
        setCarouselCount(carouselItems.length);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data.",
          variant: "destructive"
        });
      }
    };
    if (isAuthenticated) {
      loadCounts();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (adminCredentials.username === "admin" && adminCredentials.password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!"
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
                onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your trust's members, events, and content</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{membersCount}</p>
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
                  <p className="text-2xl font-bold text-foreground">{eventsCount}</p>
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
                  <p className="text-2xl font-bold text-foreground">{carouselCount}</p>
                  <p className="text-muted-foreground">Carousel Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            <MemberManagement />
          </TabsContent>
          <TabsContent value="events">
            <EventManagement />
          </TabsContent>
          <TabsContent value="carousel">
            <CarouselManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;