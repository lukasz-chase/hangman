import Hangman from "@/app/components/Hangman";
import PlayersDisplay from "@/app/components/PlayersDisplay";

function HangmanPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Hangman />
      <PlayersDisplay />
    </div>
  );
}

export default HangmanPage;
