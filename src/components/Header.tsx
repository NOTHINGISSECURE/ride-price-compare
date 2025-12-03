import { MapPin, Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">RideCompare</h1>
            <p className="text-xs text-muted-foreground">Best prices, one place</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cities</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <ProfileDropdown />
          <button className="md:hidden p-2 rounded-lg bg-secondary/50 text-foreground">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
