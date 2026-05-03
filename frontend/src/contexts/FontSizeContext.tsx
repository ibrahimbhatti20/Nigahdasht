import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type FontSize = "sm" | "md" | "lg";

interface FontSizeContextValue {
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
}

const SCALE_MAP: Record<FontSize, number> = {
  sm: 0.9,
  md: 1,
  lg: 1.15,
};

const STORAGE_KEY = "nigahdasht.fontSize";

const FontSizeContext = createContext<FontSizeContextValue | undefined>(
  undefined,
);

function getInitial(): FontSize {
  if (typeof window === "undefined") return "md";
  const stored = localStorage.getItem(STORAGE_KEY) as FontSize | null;
  if (stored === "sm" || stored === "md" || stored === "lg") return stored;
  return "md";
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(getInitial);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      String(SCALE_MAP[fontSize]),
    );
    localStorage.setItem(STORAGE_KEY, fontSize);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider
      value={{ fontSize, setFontSize: setFontSizeState }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx)
    throw new Error("useFontSize must be used within <FontSizeProvider>");
  return ctx;
}
