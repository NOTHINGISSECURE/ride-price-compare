import { useState, useCallback } from "react";
import { Navigation, MapPin } from "lucide-react";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";

interface LocationInputProps {
  pickup: string;
  destination: string;
  onPickupChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

interface LatLng {
  lat: number;
  lng: number;
}

const LocationInput = ({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
}: LocationInputProps) => {
  const [pickupCoords, setPickupCoords] = useState<LatLng | null>(null);
  const [destCoords, setDestCoords] = useState<LatLng | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  const calculateDistance = useCallback((pickup: LatLng | null, dest: LatLng | null) => {
    if (!pickup || !dest) {
      setDistance(null);
      return;
    }

    // Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = ((dest.lat - pickup.lat) * Math.PI) / 180;
    const dLon = ((dest.lng - pickup.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pickup.lat * Math.PI) / 180) *
        Math.cos((dest.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    setDistance(d.toFixed(1));
  }, []);

  const handlePickupChange = useCallback(
    (value: string, _placeId?: string, latLng?: LatLng) => {
      onPickupChange(value);
      if (latLng) {
        setPickupCoords(latLng);
        calculateDistance(latLng, destCoords);
      }
    },
    [onPickupChange, destCoords, calculateDistance]
  );

  const handleDestinationChange = useCallback(
    (value: string, _placeId?: string, latLng?: LatLng) => {
      onDestinationChange(value);
      if (latLng) {
        setDestCoords(latLng);
        calculateDistance(pickupCoords, latLng);
      }
    },
    [onDestinationChange, pickupCoords, calculateDistance]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <GoogleMapsAutocomplete
          value={pickup}
          onChange={handlePickupChange}
          placeholder="Enter pickup location"
          className="pl-12 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 rounded-xl text-base"
          icon={<div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />}
        />

        <div className="flex items-center gap-3 px-4">
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-rapido rounded-full" />
          <span className="text-xs text-muted-foreground">
            {distance ? `${distance} km` : "Route"}
          </span>
        </div>

        <GoogleMapsAutocomplete
          value={destination}
          onChange={handleDestinationChange}
          placeholder="Enter destination"
          className="pl-12 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 rounded-xl text-base"
          icon={<Navigation className="w-4 h-4 text-rapido" />}
        />

        {distance && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Distance: {distance} km
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInput;
