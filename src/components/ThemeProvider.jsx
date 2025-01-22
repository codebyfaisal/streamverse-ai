import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark", // default theme
  toggleTheme: () => null,
});

export function ThemeProvider({ children }) {
  // Check localStorage for a saved theme, default to "dark" if not set
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "dark");

  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme classes and add the current theme class
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);