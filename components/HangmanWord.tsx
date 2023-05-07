import { memo } from "react";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export const HangmanWord = memo(
  ({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) => {
    return (
      <div className="flex gap-1 text-3xl md:text-5xl font-bold uppercase mt-4">
        {wordToGuess.split("").map((letter, index) => (
          <span className="border-b-2 border-white font-robotoMono" key={index}>
            <span
              className={`${
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "invisible"
              } ${
                !guessedLetters.includes(letter) && reveal
                  ? "text-black"
                  : "text-lime-500"
              }`}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
    );
  }
);
