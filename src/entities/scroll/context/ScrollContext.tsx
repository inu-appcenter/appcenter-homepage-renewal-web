'use client';
import { createContext, useContext } from 'react';

interface ScrollContextType {
  scrollToId: (id: string) => void;
}

export const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a FullPageScroll provider');
  }
  return context;
};
