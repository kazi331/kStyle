"use client";

import { createContext, useContext, useState } from "react";

type BagContextValue = {
  count: number;
  add: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <BagContext.Provider value={{ count, add: () => setCount((value) => value + 1) }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const bag = useContext(BagContext);

  if (!bag) {
    throw new Error("useBag must be used within BagProvider");
  }

  return bag;
}
