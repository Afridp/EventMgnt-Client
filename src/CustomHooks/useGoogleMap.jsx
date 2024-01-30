import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
const Api = import.meta.env.VITE_GOOGLE_MAP_API

const useGoogleMap = () => {
  const libraries = useMemo(() => ["places"], []);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: Api,
    libraries: libraries,
  });

  useEffect(() => {
    if (scriptLoaded) {
      setIsLoaded(true);
    }
  }, [scriptLoaded]);
  return { isLoaded, loadError };
};

export default useGoogleMap;
