import React, { createContext, useState, ReactNode } from 'react';

interface TotalUsageContextType {
  totalUsage: number;
  setTotalUsage: (usage: number) => void;
}

export const TotalUsageContext = createContext<TotalUsageContextType | undefined>(undefined);

export const TotalUsageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalUsage, setTotalUsage] = useState<number>(0);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      {children}
    </TotalUsageContext.Provider>
  );
};
