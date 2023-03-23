import Hangman from "@/app/components/Hangman";
import PlayersDisplay from "@/app/components/PlayersDisplay";

function HangmanPage() {
  return (
    <div className="h-screen w-full mt-56 md:mt-0 flex-col gap-5 md:gap-0 md:flex-row flexCenter">
      <Hangman />
      <PlayersDisplay />
    </div>
  );
}

export default HangmanPage;
