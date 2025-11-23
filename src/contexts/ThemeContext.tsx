import React, { useContext, createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  color: string | null;
  setColor: (color: string) => void;
  toggleTheme: () => void;
};

const ColorStorageKey = "fl-theme-color";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Get initialTheme
  const initialTheme = () => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>(initialTheme);

  //Modify theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // +++++++++++++++++++ Color Theme +++++++++++++++++++

  const [color, setColor] = useState<string | null>(null);

  const updateFavicon = (color: string) => {
    let fileName = "";

    if (color === "mono") {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      fileName = dark
        ? "fl-logo-mono-light.svg" // icon should contrast
        : "fl-logo-mono-dark.svg";
    } else {
      fileName = `fl-logo-${color}.svg`;
    }

    const url = `/logo/${fileName}`;

    let link = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = url;
  };

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(ColorStorageKey) || "red";
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
    localStorage.setItem(ColorStorageKey, newColor);
    updateFavicon(newColor);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, color, setColor: applyTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be within the ThemeProvider.");
  return context;
};
