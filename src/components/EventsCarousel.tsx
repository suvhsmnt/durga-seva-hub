import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState,useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CarouselItem } from "@/data/dummyData";
import { fetchCarouselItems } from "@/lib/api";

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carousel, setCarousel] = useState<CarouselItem[]>([]);
  const [newCarouselItem, setNewCarouselItem] = useState<Partial<CarouselItem>>({
    id:"",
    title: "",
    description: "",
    image: "",
    link: ""
  });
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
      };
      loadCarouselItems();
    }, []);
  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carousel.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id='events' className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Events & Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our ongoing initiatives and past achievements in serving the community
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carousel.map((crsl) => (
                <div key={crsl.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 shadow-lg hover:shadow-divine transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-full">
                        <img 
                          src={crsl.image} 
                          alt={crsl.title}
                          className="w-full h-full object-cover rounded-l-xl"
                        />
                        {/* <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                          event.category === 'past' 
                            ? 'bg-secondary text-secondary-foreground' 
                            : 'bg-success text-success-foreground'
                        }`}>
                          {event.category === 'past' ? 'Completed' : 'Upcoming'}
                        </div> */}
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4 text-foreground">
                          {crsl.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {crsl.description}
                        </p>
                        
                        {/* <div className="space-y-3 mb-6">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-3 text-primary" />
                            <span>{new Date(event.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-3 text-primary" />
                            <span>{event.venue}</span>
                          </div>
                          {event.beneficiaries && (
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-4 h-4 mr-3 text-primary" />
                              <span>{event.beneficiaries} people benefited</span>
                            </div>
                          )}
                        </div> */}

                        <Button variant="divine" className="w-fit">
                          Learn More
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
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

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {carousel.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary shadow-divine' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCarousel;