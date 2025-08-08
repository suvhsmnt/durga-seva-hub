import { Button } from "@/components/ui/button";
import { Menu, X, Users, Calendar, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Trust Name */}
          <div className="flex items-center space-x-4" onClick={() => navigate('/')} role="button">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-divine">
              <img 
                src="/lovable-uploads/82ecd40d-b28b-474d-9a6d-f6a78609306d.png" 
                alt="Trust Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground leading-tight">
                Brindabanchak Paschimpara
              </h1>
              <p className="text-sm text-muted-foreground">
                Sri Sri Durga Puja & Social Charitable Trust
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => navigate('/about')}>
              About Us
            </Button>
            <Button variant="ghost" onClick={() => navigate('/events')}>
              Events
            </Button>
            <Button variant="ghost" onClick={() => navigate('/members')}>
              Members
            </Button>
            <Button variant="divine" onClick={() => navigate('/admin')}>
              <Settings className="w-4 h-4" />
              Admin
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" className="justify-start" onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}>
                Home
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}>
                About Us
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => {
                navigate('/events');
                setIsMenuOpen(false);
              }}>
                <Calendar className="w-4 h-4" />
                Events
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => {
                navigate('/members');
                setIsMenuOpen(false);
              }}>
                <Users className="w-4 h-4" />
                Members
              </Button>
              <Button variant="divine" className="justify-start" onClick={() => {
                navigate('/admin');
                setIsMenuOpen(false);
              }}>
                <Settings className="w-4 h-4" />
                Admin Panel
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;