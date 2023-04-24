//components
import GamesHistory from "@/components/GamesHistory";
import Login from "@/components/Login";

type Props = {
  params: {
    id: string;
  };
};

const History = ({ params: { id: userId } }: Props) => {
  return (
    <Login>
      <div className="h-[100dvh] flexCenter">
        <GamesHistory userId={userId} />
      </div>
    </Login>
  );
};

export default History;
