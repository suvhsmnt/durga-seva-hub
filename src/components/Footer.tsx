import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-card to-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Trust Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <img 
                  src="/image/82ecd40d-b28b-474d-9a6d-f6a78609306d.png" 
                  alt="Trust Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Brindabanchak Paschimpara</h3>
                <p className="text-sm text-muted-foreground">Sri Sri Durga Puja & Social Charitable Trust</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Serving humanity with the divine blessings of Durga Maa through compassionate service 
              and community development initiatives across 10 key areas.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  Brindabanchak, Paschimpara<br />
                  Hooghly, West Bengal, India
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">contact@durgasevahub.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Our Services</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                "Women Empowerment",
                "Art & Culture",
                "Health Support", 
                "Flood Relief",
                "Youth Awareness",
                "Environment Protection",
                "Farmer Training",
                "Elderly Care",
                "Child Development",
                "No Hunger Initiative"
              ].map((service, index) => (
                <div key={index} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Brindabanchak Paschimpara Sri Sri Durga Puja & Social Charitable Trust. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-destructive fill-current" />
              <span>for the community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;