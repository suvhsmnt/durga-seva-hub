import Header from "@/components/Header";
import About from "@/components/About";
import Member from "@/components/Member";
import DivineCircle from "@/components/DivineCircle";
import EventsCarousel from "@/components/EventsCarousel";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <DivineCircle />
      <About />
      <Member />
      <EventsCarousel />
      <Testimonials/>
      <Footer />
    </div>
  );
};

export default Index;
