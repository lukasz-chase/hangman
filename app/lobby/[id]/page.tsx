//components
import LobbyDetails from "@/components/LobbyDetails";
import Login from "@/components/Login";

type Props = {
  params: {
    id: string;
  };
};

const Lobby = ({ params: { id: lobbyId } }: Props) => {
  return (
    <Login>
      <div className="flexCenter min-h-screen">
        <LobbyDetails roomId={lobbyId} />
      </div>
    </Login>
  );
};

export default Lobby;
