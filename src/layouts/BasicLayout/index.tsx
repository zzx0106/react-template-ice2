/*
 * @Author: linzhihai
 * @Date: 2021-08-26 19:11:49
 * @LastEditTime: 2021-11-04 11:06:16
 * @Description:
 */
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
