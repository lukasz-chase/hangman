import Hangman from "@/app/components/Hangman";
import Scoreboard from "@/app/components/Scoreboard";

function HangmanPage() {
  return (
    <div className="h-screen w-full mt-96 md:mt-0 flex-col gap-5  md:flex-row flexCenter">
      <Hangman />
      <Scoreboard />
    </div>
  );
}

export default HangmanPage;
