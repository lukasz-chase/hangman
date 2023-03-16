import LobbyDisplay from "@/app/components/LobbyDisplay";

type Props = {
  params: {
    id: string;
  };
};

const Lobby = ({ params: { id: lobbyId } }: Props) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="p-5">Welcome to {lobbyId} lobby</h1>
      <LobbyDisplay roomId={lobbyId} />
    </div>
  );
};

export default Lobby;
