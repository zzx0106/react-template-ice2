import { createContext } from 'react';
import PageNav from './components/PageNav';

export const ThemeContext = createContext('light');

export default function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value="light">
      <PageNav>{children}</PageNav>
    </ThemeContext.Provider>
  );
}
