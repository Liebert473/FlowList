import { useEffect, useState } from "react";

const STORAGE_KEY = "fl-theme-color";

export const useThemeColor = () => {
  const [color, setColor] = useState<string | null>(null);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || "red";
    applyTheme(saved);
  }, []);

  const applyTheme = (newColor: string) => {
    const html = document.documentElement;

    // remove all old theme classes
    html.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        html.classList.remove(cls);
      }
    });

    html.classList.add(`theme-${newColor}`);

    setColor(newColor);
    localStorage.setItem(STORAGE_KEY, newColor);
  };

  return { color, setColor: applyTheme };
};
