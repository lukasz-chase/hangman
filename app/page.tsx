//components
import LobbyList from "@/components/LobbyList";
import Login from "@/components/Login";
import CustomLink from "@/components/CustomLink";

const mainPage = () => {
  return (
    <Login>
      <main className="h-[100dvh] flexCenter flex-col gap-5">
        <CustomLink link="/game" label="Stwórz Pokój" />
        <LobbyList />
      </main>
    </Login>
  );
};
export default mainPage;
