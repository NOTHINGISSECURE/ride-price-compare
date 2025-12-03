import { Clock, Users, Zap, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceComparisonCardProps {
  provider: "ola" | "uber" | "rapido";
  price: number;
  eta: string;
  surgeMultiplier?: number;
  isLoading?: boolean;
  isCheapest?: boolean;
  animationDelay?: number;
}

const providerConfig = {
  ola: {
    name: "Ola",
    logo: "🟡",
    colorClass: "border-ola/30 hover:border-ola/60",
    accentClass: "text-ola",
    bgClass: "bg-ola/10",
  },
  uber: {
    name: "Uber",
    logo: "⬛",
    colorClass: "border-uber/20 hover:border-uber/40",
    accentClass: "text-uber",
    bgClass: "bg-uber/10",
  },
  rapido: {
    name: "Rapido",
    logo: "🟢",
    colorClass: "border-rapido/30 hover:border-rapido/60",
    accentClass: "text-rapido",
    bgClass: "bg-rapido/10",
  },
};

const PriceComparisonCard = ({
  provider,
  price,
  eta,
  surgeMultiplier = 1,
  isLoading = false,
  isCheapest = false,
  animationDelay = 0,
}: PriceComparisonCardProps) => {
  const config = providerConfig[provider];

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 border animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-secondary" />
          <div className="h-6 w-24 bg-secondary rounded" />
        </div>
        <div className="h-10 w-32 bg-secondary rounded mb-4" />
        <div className="flex gap-4">
          <div className="h-4 w-20 bg-secondary rounded" />
          <div className="h-4 w-20 bg-secondary rounded" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 border-2 transition-all duration-500 cursor-pointer group",
        "opacity-0 animate-fade-in hover:scale-[1.02] hover:shadow-elevated",
        config.colorClass,
        isCheapest && "ring-2 ring-primary/50"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {isCheapest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1">
          <TrendingDown className="w-3 h-3" />
          Best Price
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl", config.bgClass)}>
            {config.logo}
          </div>
          <span className="text-xl font-semibold text-foreground">{config.name}</span>
        </div>
        {surgeMultiplier > 1 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-lg">
            <Zap className="w-3 h-3" />
            {surgeMultiplier}x
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className={cn("text-4xl font-bold", config.accentClass)}>₹{price}</span>
          {surgeMultiplier > 1 && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{Math.round(price / surgeMultiplier)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{eta}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>4 seats</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/30">
        <button className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all duration-300",
          "bg-secondary/50 text-foreground hover:bg-secondary group-hover:bg-primary group-hover:text-primary-foreground"
        )}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PriceComparisonCard;
