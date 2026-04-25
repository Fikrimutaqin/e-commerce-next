"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook untuk mendeteksi apakah ukuran layar sesuai dengan query tertentu.
 * Menggunakan useSyncExternalStore untuk sinkronisasi yang aman dengan browser API.
 */
export const useMediaQuery = (query: string = "(max-width: 1024px)") => {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

/**
 * Hook khusus untuk mendeteksi Mobile/Tablet (lg breakpoint).
 * True jika lebar layar <= 1024px.
 */
export const useIsMobile = () => {
  return useMediaQuery("(max-width: 1024px)");
};
