import Login from "@/components/Login";
import Results from "@/components/Results";

type Props = {
  params: {
    id: string;
  };
};

const ResultsPage = ({ params: { id: roomId } }: Props) => {
  return (
    <Login>
      <div className="h-[100dvh]">
        <Results roomId={roomId} />
      </div>
    </Login>
  );
};

export default ResultsPage;
