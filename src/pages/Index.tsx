import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventsCarousel from "@/components/EventsCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <EventsCarousel />
      <Footer />
    </div>
  );
};

export default Index;
