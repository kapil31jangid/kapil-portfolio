"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { SuitConfig, SuitId, suitCollection, suitMap } from "@/data/suitThemes";

interface ArmourThemeContextType {
  activeSuit: SuitConfig;
  suitId: SuitId;
  setSuitId: (id: SuitId) => void;
  previousSuit: () => void;
  nextSuit: () => void;
  isArmouryOpen: boolean;
  setIsArmouryOpen: (open: boolean) => void;
  isTransforming: boolean;
}

const ArmourThemeContext = createContext<ArmourThemeContextType | undefined>(
  undefined
);

export function ArmourThemeProvider({ children }: { children: ReactNode }) {
  const [suitId, setSuitIdState] = useState<SuitId>("mark-3");
  const [isArmouryOpen, setIsArmouryOpen] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  // Sync state from localStorage on mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("kj-armour-selected-theme") as SuitId;
        if (saved && suitMap[saved]) {
          setSuitIdState(saved);
          document.documentElement.setAttribute("data-armour-theme", saved);
        } else {
          document.documentElement.setAttribute("data-armour-theme", "mark-3");
        }
      } catch {
        document.documentElement.setAttribute("data-armour-theme", "mark-3");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setSuitId = useCallback(
    (newSuitId: SuitId) => {
      if (newSuitId === suitId || isTransforming) return;

      setIsTransforming(true);
      const currentScrollY = window.scrollY;

      // 1. Trigger suit deconstruction & state change
      setTimeout(() => {
        setSuitIdState(newSuitId);
        document.documentElement.setAttribute("data-armour-theme", newSuitId);
        try {
          localStorage.setItem("kj-armour-selected-theme", newSuitId);
        } catch {
          // Fallback if localStorage unavailable
        }
      }, 400);

      // 2. Complete assembly & restore interaction
      setTimeout(() => {
        setIsTransforming(false);
        window.scrollTo(0, currentScrollY);
      }, 950);
    },
    [suitId, isTransforming]
  );

  const previousSuit = useCallback(() => {
    const currentIndex = suitCollection.findIndex((s) => s.id === suitId);
    const prevIndex =
      (currentIndex - 1 + suitCollection.length) % suitCollection.length;
    setSuitId(suitCollection[prevIndex].id);
  }, [suitId, setSuitId]);

  const nextSuit = useCallback(() => {
    const currentIndex = suitCollection.findIndex((s) => s.id === suitId);
    const nextIndex = (currentIndex + 1) % suitCollection.length;
    setSuitId(suitCollection[nextIndex].id);
  }, [suitId, setSuitId]);

  const activeSuit = suitMap[suitId] || suitMap["mark-3"];

  return (
    <ArmourThemeContext.Provider
      value={{
        activeSuit,
        suitId,
        setSuitId,
        previousSuit,
        nextSuit,
        isArmouryOpen,
        setIsArmouryOpen,
        isTransforming,
      }}
    >
      {children}
    </ArmourThemeContext.Provider>
  );
}

export function useArmourTheme() {
  const context = useContext(ArmourThemeContext);
  if (!context) {
    throw new Error("useArmourTheme must be used within an ArmourThemeProvider");
  }
  return context;
}
