let isLoading = false;
let isLoaded = false;

export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isLoaded) {
      resolve();
      return;
    }

    if (isLoading) {
      // Wait for existing load
      const checkLoaded = setInterval(() => {
        if (isLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }

    isLoading = true;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error("Google Maps API key not found");
      reject(new Error("Google Maps API key not configured"));
      return;
    }

    // Create callback
    const callbackName = `initGoogleMaps_${Date.now()}`;
    (window as unknown as Record<string, () => void>)[callbackName] = () => {
      isLoaded = true;
      isLoading = false;
      resolve();
      delete (window as unknown as Record<string, () => void>)[callbackName];
    };

    // Create script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      isLoading = false;
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });
};

export const isGoogleMapsLoaded = () => isLoaded;
