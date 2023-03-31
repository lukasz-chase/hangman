import Hangman from "@/app/components/Hangman";
import Scoreboard from "@/app/components/Scoreboard";

const HangmanPage = () => {
  return (
    <div className="h-screen w-full mt-96 xl:mt-0 flex-col gap-5  xl:flex-row flexCenter">
      <Hangman />
      <Scoreboard />
    </div>
  );
};

export default HangmanPage;
