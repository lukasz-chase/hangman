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
      <div className="h-[100dvh] flexCenter flex-col mt-20 md:mt-0">
        <h1 className="p-5">Welcome to {lobbyId} lobby</h1>
        <LobbyDetails roomId={lobbyId} />
      </div>
    </Login>
  );
};

export default Lobby;
