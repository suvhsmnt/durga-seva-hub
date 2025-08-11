import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, query, getCountFromServer } from "firebase/firestore";
import { db, storage } from "../lib/firebase";

interface Stats {
  members: number;
  events: number;
  livesTouched: number;
}

const About = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ members: 500, events: 50, livesTouched: 10000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch counts from Firestore collections
        const membersQuery = query(collection(db, "members"));
        const eventsQuery = query(collection(db, "events"));
        const beneficiariesQuery = query(collection(db, "beneficiaries"));

        const [membersSnapshot, eventsSnapshot, beneficiariesSnapshot] = await Promise.all([
          getCountFromServer(membersQuery),
          getCountFromServer(eventsQuery),
          getCountFromServer(beneficiariesQuery),
        ]);

        setStats({
          members: membersSnapshot.data().count,
          events: eventsSnapshot.data().count,
          livesTouched: beneficiariesSnapshot.data().count,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics. Using default values.");
        // Keep default stats as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id='about' className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image/bg.png"
          alt="Durga Maa"
          className="w-full h-full opacity-20 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
          {/* Main Heading */}
          <div className="max-w-4xl mx-auto">
          {/* Main Heading */}

          {/* Sections: History, Vision & Mission, Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* History */}
            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-divine transition-all duration-300 border border-border/50">
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">Our History</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Founded with a deep-rooted commitment to community welfare, Brindabanchak Paschimpara Sri Sri Durga Puja & Social Charitable Trust began as a humble initiative to celebrate Durga Puja while uplifting the underprivileged. Over the years, we have grown into a beacon of hope, organizing cultural events and social programs that empower and unite our community.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-divine transition-all duration-300 border border-border/50">
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">Vision & Mission</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Our vision is to create a society where every individual thrives with dignity and opportunity. Our mission is to serve as a catalyst for positive change by promoting education, health, and cultural heritage, guided by the divine principles of compassion, unity, and service embodied in Durga Puja.
              </p>
            </div>

            {/* Objectives */}
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-divine transition-all duration-300 border border-border/50">
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">Our Objectives</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                We aim to empower women, support education, provide healthcare, promote environmental sustainability, and foster cultural awareness. Through targeted initiatives like flood relief, youth programs, and support for the elderly, we strive to touch lives and build a stronger, more inclusive community.
              </p>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;