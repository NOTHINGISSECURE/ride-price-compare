import { useState, useEffect, useCallback } from "react";
import { RideType } from "@/components/RideTypeSelector";

interface PriceData {
  ola: number;
  uber: number;
  rapido: number;
}

interface ETAData {
  ola: string;
  uber: string;
  rapido: string;
}

interface SurgeData {
  ola: number;
  uber: number;
  rapido: number;
}

// Mock price generation based on ride type
const getBasePrices = (rideType: RideType): PriceData => {
  const basePrices = {
    bike: { ola: 45, uber: 55, rapido: 35 },
    auto: { ola: 85, uber: 95, rapido: 75 },
    mini: { ola: 145, uber: 155, rapido: 135 },
    sedan: { ola: 235, uber: 245, rapido: 225 },
    suv: { ola: 345, uber: 365, rapido: 335 },
  };
  return basePrices[rideType];
};

// Add some randomness to simulate live pricing
const addVariation = (price: number): number => {
  const variation = Math.floor(Math.random() * 30) - 15;
  return Math.max(price + variation, 50);
};

export const usePriceComparison = (
  pickup: string,
  destination: string,
  rideType: RideType
) => {
  const [prices, setPrices] = useState<PriceData | null>(null);
  const [etas, setETAs] = useState<ETAData | null>(null);
  const [surges, setSurges] = useState<SurgeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cheapestProvider, setCheapestProvider] = useState<keyof PriceData | null>(null);

  const fetchPrices = useCallback(async () => {
    if (!pickup || !destination) {
      setPrices(null);
      setETAs(null);
      setSurges(null);
      setCheapestProvider(null);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const basePrices = getBasePrices(rideType);
    const newPrices: PriceData = {
      ola: addVariation(basePrices.ola),
      uber: addVariation(basePrices.uber),
      rapido: addVariation(basePrices.rapido),
    };

    // Random ETAs
    const newETAs: ETAData = {
      ola: `${Math.floor(Math.random() * 5) + 2} min`,
      uber: `${Math.floor(Math.random() * 5) + 3} min`,
      rapido: `${Math.floor(Math.random() * 4) + 2} min`,
    };

    // Random surge (mostly 1x, occasionally higher)
    const newSurges: SurgeData = {
      ola: Math.random() > 0.8 ? 1.2 : 1,
      uber: Math.random() > 0.85 ? 1.3 : 1,
      rapido: Math.random() > 0.9 ? 1.1 : 1,
    };

    // Apply surge to prices
    const finalPrices: PriceData = {
      ola: Math.round(newPrices.ola * newSurges.ola),
      uber: Math.round(newPrices.uber * newSurges.uber),
      rapido: Math.round(newPrices.rapido * newSurges.rapido),
    };

    // Find cheapest
    const providers: (keyof PriceData)[] = ["ola", "uber", "rapido"];
    const cheapest = providers.reduce((a, b) =>
      finalPrices[a] < finalPrices[b] ? a : b
    );

    setPrices(finalPrices);
    setETAs(newETAs);
    setSurges(newSurges);
    setCheapestProvider(cheapest);
    setIsLoading(false);
  }, [pickup, destination, rideType]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  // Auto-refresh prices every 30 seconds
  useEffect(() => {
    if (pickup && destination) {
      const interval = setInterval(fetchPrices, 30000);
      return () => clearInterval(interval);
    }
  }, [pickup, destination, fetchPrices]);

  return {
    prices,
    etas,
    surges,
    isLoading,
    cheapestProvider,
    refresh: fetchPrices,
  };
};
