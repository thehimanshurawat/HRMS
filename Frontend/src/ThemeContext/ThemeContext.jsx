import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   // ✅ Dark Mode State
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
   // ✅ Save theme state in localStorage
   useEffect(() => {
    document.body.setAttribute("data-theme", theme.toLowerCase()); 
    localStorage.setItem("theme", theme);
  }, [theme]);
   

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(ThemeContext);
};
