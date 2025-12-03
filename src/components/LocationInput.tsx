import { MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LocationInputProps {
  pickup: string;
  destination: string;
  onPickupChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

const LocationInput = ({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
}: LocationInputProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>
          <Input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => onPickupChange(e.target.value)}
            className="pl-12 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 rounded-xl text-base"
          />
        </div>
        
        <div className="flex items-center gap-3 px-4">
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-rapido rounded-full" />
          <span className="text-xs text-muted-foreground">Route</span>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Navigation className="w-4 h-4 text-rapido" />
          </div>
          <Input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="pl-12 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 rounded-xl text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
