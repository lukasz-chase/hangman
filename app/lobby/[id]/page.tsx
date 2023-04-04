import LobbyDetails from "@/components/LobbyDetails";

type Props = {
  params: {
    id: string;
  };
};

const Lobby = ({ params: { id: lobbyId } }: Props) => {
  return (
    <div className="h-screen flexCenter flex-col mt-20 md:mt-0">
      <h1 className="p-5">Welcome to {lobbyId} lobby</h1>
      <LobbyDetails roomId={lobbyId} />
    </div>
  );
};

export default Lobby;
