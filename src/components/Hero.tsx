import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/17c4a59c-ed78-4c0d-b538-b12d69819832.png"
          alt="Durga Maa"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 float-animation">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Brindabanchak Paschimpara
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-secondary mb-4">
              Sri Sri Durga Puja & Social Charitable Trust
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving humanity with the divine blessings of Durga Maa through 10 pillars of service
            </p>
          </div>

          {/* Service Areas Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              { icon: "👩‍💼", title: "Women Empowerment" },
              { icon: "🎭", title: "Art & Culture" },
              { icon: "🍽️", title: "No Hunger" },
              { icon: "🏥", title: "Health Support" },
              { icon: "🌊", title: "Flood Relief" },
              { icon: "🎓", title: "Youth Awareness" },
              { icon: "🌱", title: "Environment Protection" },
              { icon: "🚜", title: "Train Farmers" },
              { icon: "👴", title: "Help Old Age" },
              { icon: "👶", title: "Child Development" }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-lg p-4 text-center hover:shadow-divine transition-all duration-300 hover:scale-105 border border-border/50"
              >
                <div className="text-2xl mb-2">{service.icon}</div>
                <p className="text-xs font-medium text-foreground">{service.title}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/events')}
              className="divine-glow"
            >
              <Calendar className="w-5 h-5" />
              View Our Events
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="sacred" 
              size="lg"
              onClick={() => navigate('/members')}
            >
              <Users className="w-5 h-5" />
              Our Members
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/about')}
            >
              <Heart className="w-5 h-5" />
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Lives Touched</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;