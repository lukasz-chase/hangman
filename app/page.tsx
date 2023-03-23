import Button from "./components/Button";
import RoomsDisplay from "./components/RoomsDisplay";

export default function Home() {
  return (
    <main className="h-screen  flex-col flexCenter gap-5">
      <Button link="/game">Create a game</Button>
      <RoomsDisplay />
    </main>
  );
}
