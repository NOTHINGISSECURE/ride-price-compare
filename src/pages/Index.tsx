import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import LocationInput from "@/components/LocationInput";
import RideTypeSelector, { RideType } from "@/components/RideTypeSelector";
import PriceComparisonCard from "@/components/PriceComparisonCard";
import StatsBar from "@/components/StatsBar";
import { usePriceComparison } from "@/hooks/usePriceComparison";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState<RideType>("bike");

  const { prices, etas, surges, isLoading, cheapestProvider, refresh } =
    usePriceComparison(pickup, destination, rideType);

  const showResults = pickup && destination;

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rapido/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 opacity-0 animate-fade-in">
              Compare <span className="text-gradient">Ride Prices</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Find the best fares across Ola, Uber & Rapido instantly.
              Save money on every ride.
            </p>
          </div>

          {/* Location Input */}
          <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <LocationInput
              pickup={pickup}
              destination={destination}
              onPickupChange={setPickup}
              onDestinationChange={setDestination}
            />
          </div>

          {/* Ride Type Selector */}
          <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <RideTypeSelector selected={rideType} onSelect={setRideType} />
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Available rides
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refresh}
                  disabled={isLoading}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <PriceComparisonCard
                  provider="ola"
                  price={prices?.ola ?? 0}
                  eta={etas?.ola ?? "..."}
                  surgeMultiplier={surges?.ola}
                  isLoading={isLoading}
                  isCheapest={cheapestProvider === "ola"}
                  animationDelay={0}
                />
                <PriceComparisonCard
                  provider="uber"
                  price={prices?.uber ?? 0}
                  eta={etas?.uber ?? "..."}
                  surgeMultiplier={surges?.uber}
                  isLoading={isLoading}
                  isCheapest={cheapestProvider === "uber"}
                  animationDelay={100}
                />
                <PriceComparisonCard
                  provider="rapido"
                  price={prices?.rapido ?? 0}
                  eta={etas?.rapido ?? "..."}
                  surgeMultiplier={surges?.rapido}
                  isLoading={isLoading}
                  isCheapest={cheapestProvider === "rapido"}
                  animationDelay={200}
                />
              </div>
            </div>
          )}

          {/* Stats Section */}
          <StatsBar />

          {/* How it works */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "700ms" }}>
              How it <span className="text-gradient">works</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Enter locations",
                  description: "Add your pickup point and destination to get started",
                },
                {
                  step: "02",
                  title: "Compare prices",
                  description: "See real-time prices from Ola, Uber & Rapido side by side",
                },
                {
                  step: "03",
                  title: "Book your ride",
                  description: "Choose the best deal and get redirected to book",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 RideCompare. All rights reserved. Made with ❤️ in India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
