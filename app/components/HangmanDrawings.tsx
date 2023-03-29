import { bodyParts, machineParts } from "../descriptions/Hangman";

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
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
