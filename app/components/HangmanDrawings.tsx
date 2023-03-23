import bodyParts from "../descriptions/Hangman";

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div className="relative">
      {bodyParts.slice(0, numberOfGuesses)}
      <div className="h-[30px] w-[8px] md:h-[50px] md:w-[10px] bg-black absolute top-0 right-0" />
      <div className="h-[8px] w-[100px] md:h-[10px] md:w-[200px] bg-black ml-[60px] md:ml-[120px]" />
      <div className="h-[200px] w-[8px] md:h-[400px] md:w-[10px] bg-black ml-[60px] md:ml-[120px]" />
      <div className="h-[8px] w-[125px] md:h-[10px] md:w-[250px] bg-black" />
    </div>
  );
}
