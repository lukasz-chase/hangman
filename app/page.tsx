import Link from "next/link";
import LobbyList from "@/components/LobbyList";

export default () => {
  return (
    <main className="h-[100dvh]  flex-col flexCenter gap-5">
      <Link
        className="btn btn-accent text-sm md:text-xl uppercase shadow-md text-center"
        href="/game"
      >
        Create a lobby
      </Link>
      <LobbyList />
    </main>
  );
};
