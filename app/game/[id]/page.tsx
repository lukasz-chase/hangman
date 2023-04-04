import Hangman from "@/components/Hangman";
import Scoreboard from "@/components/Scoreboard";

type Props = {
  params: {
    id: string;
  };
};

const HangmanPage = ({ params: { id: gameId } }: Props) => {
  return (
    <div className="h-[100dvh] w-full mt-[26rem] lg:mt-64 xl:mt-0 flex-col gap-5  xl:flex-row flexCenter">
      <Hangman roomId={gameId} />
      <Scoreboard />
    </div>
  );
};

export default HangmanPage;
