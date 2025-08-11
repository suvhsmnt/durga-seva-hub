import { useState, useEffect } from "react";

interface Aspect {
  icon: string;
  title: string;
}

const aspects: Aspect[] = [
  { icon: "👩‍💼", title: "Women Empowerment" },
  { icon: "🎭", title: "Art & Culture" },
  { icon: "🍽️", title: "No Hunger" },
  { icon: "🏥", title: "Health Support" },
  { icon: "🌊", title: "Flood Relief" },
  { icon: "🎓", title: "Youth Awareness" },
  { icon: "🌱", title: "Environment Protection" },
  { icon: "🚜", title: "Train Farmers" },
  { icon: "👴", title: "Help Old Age" },
  { icon: "👶", title: "Child Development" },
];

const CAROUSEL_PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

const DivineCircle = () => {
  const [hoveredAspect, setHoveredAspect] = useState<number | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  // Auto-rotate every 3 seconds, moving one step (36 degrees)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotation((prev) => prev + 36);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='home' className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-8 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Entire Rotating Circle (Central Image + Aspects) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 animate-fade-in-scale">
            {/* Central Divine Circle */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-2 animate-sacred-glow">
              <div className="w-full h-full rounded-full bg-card border-4 border-primary/30 overflow-hidden shadow-2xl">
                <img
                  src="image/durga.jpg"
                  alt="Devi Durga"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = CAROUSEL_PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
            </div>

            {/* Rotating Aspects Container */}
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out"
              style={{
                transform: `rotate(${currentRotation}deg)`,
              }}
            >
              {aspects.map((aspect, index) => {
                const angle = (index * 360) / aspects.length;
                const radius = 250; // Adjusted radius for balance
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                    onMouseEnter={() => setHoveredAspect(index)}
                    onMouseLeave={() => setHoveredAspect(null)}
                  >
                    <div className="relative">
                      <div
                        className={`
                          w-16 h-16 md:w-20 md:h-20 rounded-full 
                          bg-gradient-to-br from-primary to-secondary
                          border-2 border-accent/50
                          flex flex-col items-center justify-center
                          shadow-lg transition-all duration-300 cursor-pointer
                          ${
                            hoveredAspect === index
                              ? "scale-110 shadow-xl shadow-primary/50 animate-aspect-float"
                              : "hover:scale-105"
                          }
                        `}
                        style={{
                          transform: `rotate(-${currentRotation}deg)`,
                        }}
                      >
                        <span className="text-base md:text-lg filter drop-shadow-sm">
                          {aspect.icon}
                        </span>
                        <span className="text-[8px] md:text-[10px] font-medium text-center leading-tight mt-1 px-1">
                          {aspect.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Decorative Rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20"></div>
            <div className="absolute inset-4 rounded-full border border-secondary/20"></div>
            <div className="absolute inset-12 rounded-full border border-accent/20"></div>
          </div>
        </div>

        {/* Right: Title and Description */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="animate-fade-in-scale" style={{ animationDelay: "0.5s" }}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Introduction
            </h1>
            <p className="text-muted-foreground mt-2 text-base md:text-lg">
              Our Charitable Trust is dedicated to serving humanity with compassion and purpose. We work across diverse causes including women empowerment, education, healthcare, hunger relief, environmental protection, and disaster support. Guided by the spirit of unity and kindness, our mission is to bring hope, dignity, and sustainable change to communities in need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivineCircle;