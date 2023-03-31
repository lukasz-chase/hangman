import Button from "./components/Button";
import LobbyList from "./components/LobbyList";

export default () => {
  return (
    <main className="h-screen  flex-col flexCenter gap-5">
      <Button link="/game">Create a lobby</Button>
      <LobbyList />
    </main>
  );
};
