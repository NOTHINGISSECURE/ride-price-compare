import { Car, Bike, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export type RideType = "auto" | "mini" | "sedan" | "suv";

interface RideTypeSelectorProps {
  selected: RideType;
  onSelect: (type: RideType) => void;
}

const rideTypes: { id: RideType; label: string; icon: React.ReactNode }[] = [
  { id: "auto", label: "Auto", icon: <Bike className="w-5 h-5" /> },
  { id: "mini", label: "Mini", icon: <Car className="w-5 h-5" /> },
  { id: "sedan", label: "Sedan", icon: <Car className="w-5 h-5" /> },
  { id: "suv", label: "SUV", icon: <Truck className="w-5 h-5" /> },
];

const RideTypeSelector = ({ selected, onSelect }: RideTypeSelectorProps) => {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {rideTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={cn(
            "flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300",
            selected === type.id
              ? "bg-primary/10 border-primary text-primary glow-primary"
              : "bg-secondary/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          )}
        >
          {type.icon}
          <span className="font-medium">{type.label}</span>
        </button>
      ))}
    </div>
  );
};

export default RideTypeSelector;
