import Hangman from "@/components/Hangman";
import Login from "@/components/Login";

type Props = {
  params: {
    id: string;
  };
};

const HangmanPage = ({ params: { id: gameId } }: Props) => {
  return (
    <Login>
      <div className="w-full mt-[5rem] lg:mt-20 flexCenter">
        <Hangman roomId={gameId} />
      </div>
    </Login>
  );
};

export default HangmanPage;
