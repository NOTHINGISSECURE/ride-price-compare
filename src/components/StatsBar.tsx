import { TrendingDown, Clock, Shield } from "lucide-react";

const stats = [
  {
    icon: <TrendingDown className="w-5 h-5 text-primary" />,
    value: "₹50",
    label: "Avg. savings per ride",
  },
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    value: "2s",
    label: "Real-time comparison",
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    value: "3",
    label: "Trusted providers",
  },
];

const StatsBar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 150 + 600}ms` }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            {stat.icon}
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
