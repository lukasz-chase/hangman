import { memo } from "react";
import { bodyParts, machineParts } from "../descriptions/Hangman";

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export const HangmanDrawing = memo(
  ({ numberOfGuesses }: HangmanDrawingProps) => {
    return (
      <div className="relative">
        {bodyParts.slice(0, numberOfGuesses).map(({ name, className }) => (
          <div key={name} className={className} />
        ))}
        {machineParts.map(({ name, className }) => (
          <div key={name} className={className} />
        ))}
      </div>
    );
  }
);
