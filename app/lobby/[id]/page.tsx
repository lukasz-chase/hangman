import LobbyDisplay from "@/app/components/LobbyDisplay";

type Props = {
  params: {
    id: string;
  };
};

const Lobby = ({ params: { id: lobbyId } }: Props) => {
  return (
    <div className="h-screen flexCenter flex-col">
      <h1 className="p-5">Welcome to {lobbyId} lobby</h1>
      <LobbyDisplay roomId={lobbyId} />
    </div>
  );
};

export default Lobby;
