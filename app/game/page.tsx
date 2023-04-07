import GameCreation from "@/components/GameCreation";
import Login from "@/components/Login";

const Room = () => {
  return (
    <Login>
      <div className="h-[100dvh] flexCenter">
        <GameCreation />
      </div>
    </Login>
  );
};

export default Room;
