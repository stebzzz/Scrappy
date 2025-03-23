import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'darker' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  // Appliquer le thème au chargement initial
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(savedTheme);
  }, []);

  // Mettre à jour les classes CSS lorsque le thème change
  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-darker', 'theme-light');
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'dark') return 'darker';
      if (prevTheme === 'darker') return 'light';
      return 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 