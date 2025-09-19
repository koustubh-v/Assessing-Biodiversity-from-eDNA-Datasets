import { Dna } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="p-1.5 rounded-full bg-gradient-yellow">
              <Dna className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-semibold text-gradient-yellow">
              BioDNA
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/upload" className="hover:text-primary transition-colors">
              Upload
            </Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            © 2025 BioDNA Research Platform
          </div>
        </div>

        {/* Privacy Statement */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Your data is processed securely and not stored permanently on our servers.
            All analysis is performed in compliance with research data protection standards.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;