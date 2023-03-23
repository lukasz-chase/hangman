import React from "react";
import GameCreation from "../components/GameCreation";

const Room = () => {
  return (
    <div className="h-screen flexCenter flex-col">
      <h1>Create game</h1>
      <GameCreation />
    </div>
  );
};

export default Room;
