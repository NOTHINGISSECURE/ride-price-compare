import { useState } from "react";
import { User, LogIn, LogOut, Check, Link2, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ConnectedApp {
  id: "ola" | "uber" | "rapido";
  name: string;
  logo: string;
  connected: boolean;
  color: string;
}

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([
    { id: "ola", name: "Ola", logo: "🟡", connected: false, color: "ola" },
    { id: "uber", name: "Uber", logo: "⬛", connected: false, color: "uber" },
    { id: "rapido", name: "Rapido", logo: "🟢", connected: false, color: "rapido" },
  ]);

  const handleConnectApp = (appId: string) => {
    setConnectedApps((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, connected: !app.connected } : app
      )
    );
    
    const app = connectedApps.find((a) => a.id === appId);
    if (app) {
      toast({
        title: app.connected ? `${app.name} disconnected` : `${app.name} connected`,
        description: app.connected 
          ? `Your ${app.name} account has been disconnected.`
          : `Your ${app.name} account is now connected. You can book rides directly!`,
      });
    }
  };

  const connectedCount = connectedApps.filter((app) => app.connected).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300",
          "bg-secondary/50 border-border/50 hover:border-primary/30",
          isOpen && "border-primary/50 bg-primary/5"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground">Profile</span>
        {connectedCount > 0 && (
          <span className="hidden sm:flex w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs items-center justify-center font-semibold">
            {connectedCount}
          </span>
        )}
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl border border-border/50 shadow-elevated z-50 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Guest User</p>
                    <p className="text-xs text-muted-foreground">Connect apps to book rides</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Connected Apps Section */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Connect Your Accounts
              </h3>
              <div className="space-y-2">
                {connectedApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleConnectApp(app.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300",
                      app.connected
                        ? "bg-primary/5 border-primary/30"
                        : "bg-secondary/30 border-border/30 hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-xl",
                        app.connected ? "bg-primary/10" : "bg-secondary/50"
                      )}>
                        {app.logo}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">{app.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {app.connected ? "Connected • Click to disconnect" : "Click to connect"}
                        </p>
                      </div>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                      app.connected 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50 text-muted-foreground"
                    )}>
                      {app.connected ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Link2 className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-border/30 bg-secondary/20">
              <p className="text-xs text-muted-foreground text-center mb-3">
                {connectedCount === 0 
                  ? "Connect an app to enable direct booking"
                  : `${connectedCount} app${connectedCount > 1 ? 's' : ''} connected`
                }
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-border/50 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  toast({
                    title: "Sign in required",
                    description: "Create an account to save your preferences and connected apps.",
                  });
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in to save
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
