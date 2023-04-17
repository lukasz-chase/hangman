import LobbyList from "@/components/LobbyList";
import Login from "@/components/Login";
import CustomLink from "@/components/CustomLink";

const mainPage = () => {
  return (
    <Login>
      <main className="h-[100dvh]  flex-col flexCenter gap-5">
        <CustomLink link="/game" label="Create a Lobby" />
        <LobbyList />
      </main>
    </Login>
  );
};
export default mainPage;
