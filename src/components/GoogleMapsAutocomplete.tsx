import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { loadGoogleMapsScript } from "@/lib/googleMaps";

interface GoogleMapsAutocompleteProps {
  value: string;
  onChange: (value: string, placeId?: string, latLng?: { lat: number; lng: number }) => void;
  placeholder: string;
  className?: string;
  icon?: React.ReactNode;
}

interface GoogleAutocomplete {
  addListener: (event: string, callback: () => void) => void;
  getPlace: () => {
    formatted_address?: string;
    place_id?: string;
    geometry?: {
      location: {
        lat: () => number;
        lng: () => number;
      };
    };
  };
}

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: object) => GoogleAutocomplete;
        };
      };
    };
  }
}

const GoogleMapsAutocomplete = ({
  value,
  onChange,
  placeholder,
  className,
  icon,
}: GoogleMapsAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<GoogleAutocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setIsLoaded(true))
      .catch(() => setLoadError(true));
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new window.google!.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "place_id", "geometry"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.formatted_address) {
        const latLng = place.geometry?.location
          ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
          : undefined;
        onChange(place.formatted_address, place.place_id, latLng);
      }
    });
  }, [isLoaded, onChange]);

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          {icon}
        </div>
      )}
      <Input
        ref={inputRef}
        type="text"
        placeholder={loadError ? "Location search unavailable" : placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        disabled={loadError}
      />
      {!isLoaded && !loadError && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default GoogleMapsAutocomplete;
