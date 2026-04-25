"use client";

import { useState, useEffect } from "react";

/**
 * Hook untuk mendeteksi apakah ukuran layar sesuai dengan query tertentu.
 * Default menggunakan 1024px (breakpoint lg di Tailwind).
 */
export const useMediaQuery = (query: string = "(max-width: 1024px)") => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Pastikan window tersedia (mencegah error saat SSR)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      
      // Set initial value
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      // Listener untuk perubahan ukuran layar
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }
  }, [matches, query]);

  return matches;
};

/**
 * Hook khusus untuk mendeteksi Mobile/Tablet (lg breakpoint).
 * True jika lebar layar <= 1024px.
 */
export const useIsMobile = () => {
  return useMediaQuery("(max-width: 1024px)");
};
