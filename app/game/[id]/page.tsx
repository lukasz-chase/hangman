import Hangman from "@/components/Hangman";
import Login from "@/components/Login";
import Scoreboard from "@/components/Scoreboard";

type Props = {
  params: {
    id: string;
  };
};

const HangmanPage = ({ params: { id: gameId } }: Props) => {
  return (
    <Login>
      <div className="h-[100dvh] w-full mt-[26rem] lg:mt-72 xl:mt-10 flexCenter">
        <Hangman roomId={gameId} />
      </div>
    </Login>
  );
};

export default HangmanPage;
