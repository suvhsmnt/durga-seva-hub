import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Member } from "../data/dummyData";
import { fetchMembers } from "@/lib/api";
import { collection, query, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Stats {
  members: number;
  events: number;
  livesTouched: number;
}

const Member = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<Stats>({ members: 500, events: 50, livesTouched: 10000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const visibleItems = 4; // Number of visible items in carousel

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch members
        const membersData = await fetchMembers();
        // Fetch stats
        const membersQuery = query(collection(db, "members"));
        const eventsQuery = query(collection(db, "events"));
        const beneficiariesQuery = query(collection(db, "beneficiaries"));

        const [membersSnapshot, eventsSnapshot, beneficiariesSnapshot] = await Promise.all([
          getCountFromServer(membersQuery),
          getCountFromServer(eventsQuery),
          getCountFromServer(beneficiariesQuery),
        ]);

        setMembers(membersData);
        setStats({
          members: membersSnapshot.data().count,
          events: eventsSnapshot.data().count,
          livesTouched: beneficiariesSnapshot.data().count,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch members or statistics.",
          variant: "destructive",
        });
        setError("Failed to load data. Using default values.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [toast]);

  // Auto-slide every 3 seconds
 useEffect(() => {
    if (members.length <= visibleItems) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= members.length) {
          return 0; // loop back to first member
        }
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [members.length, visibleItems]);

  const nextSlide = () => {
    if (members.length <= visibleItems) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
  };

  const prevSlide = () => {
    if (members.length <= visibleItems) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + members.length) % members.length);
  };

  return (
    <section id="members" className="py-16 bg-gradient-to-b from-background to-muted/30 pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Members
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated members of our trust
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : members.length === 0 ? (
          <p className="text-center text-muted-foreground">No members available.</p>
        ) : (
          <>
            <div className="relative max-w-6xl mx-auto">
              {/* Carousel */}
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
                >
                  {members.map((member) => (
                    <div key={member.id} className="flex-shrink-0 px-2" style={{ width: `${100 / visibleItems}%` }}>
                      <Card className="w-[300px] h-[400px] mx-auto shadow-lg hover:shadow-divine transition-all duration-300">
                        <CardContent className="flex flex-col items-center justify-center h-full p-4">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-32 h-32 rounded-full object-cover mb-4"
                          />
                          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                            {member.name}
                          </h3>
                          <p className="text-muted-foreground text-sm text-center line-clamp-3">
                            {member.address}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {members.length > visibleItems && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 shadow-lg"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 shadow-lg"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              {loading ? (
                <div className="col-span-3 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{stats.members}+</div>
                    <div className="text-sm text-muted-foreground">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{stats.events}+</div>
                    <div className="text-sm text-muted-foreground">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{stats.livesTouched.toLocaleString()}+</div>
                    <div className="text-sm text-muted-foreground">Lives Touched</div>
                  </div>
                </>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Member;
