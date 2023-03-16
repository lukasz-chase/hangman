import Button from "./components/Button";
import RoomsDisplay from "./components/RoomsDisplay";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5">
      <Button link="/room">Create a lobby</Button>
      <RoomsDisplay />
    </main>
  );
}
