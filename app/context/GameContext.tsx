"use client";
import { useState, ReactNode, createContext } from "react";

const GameContext = createContext({
  isChatFocused: false,
  setIsChatFocused: (isFocused: boolean) => {},
});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [isChatFocused, setIsChatFocused] = useState<boolean>(false);

  return (
    <GameContext.Provider
      value={{
        isChatFocused,
        setIsChatFocused,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
