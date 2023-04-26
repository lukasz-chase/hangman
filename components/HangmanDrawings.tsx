import { memo } from "react";
//description
import { parts } from "@/descriptions/Hangman";

type HangmanDrawingProps = {
  numberOfGuesses: number;
  difficulty: number;
};

export const HangmanDrawing = memo(
  ({ numberOfGuesses, difficulty }: HangmanDrawingProps) => {
    const startIndex = 10 - difficulty;
    return (
      <div className="flexCenter relative min-h-[15rem] md:min-h-[20rem]">
        {parts
          .slice(startIndex, startIndex + numberOfGuesses)
          .map(({ name, className }) => (
            <div key={name} className={className} />
          ))}
        {parts.slice(0, startIndex).map(({ name, className }) => (
          <div key={name} className={className} />
        ))}
      </div>
    );
  }
);
