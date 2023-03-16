import React from "react";
import RoomCreation from "../components/RoomCreation";

const Room = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>Lobby creation</h1>
      <RoomCreation />
    </div>
  );
};

export default Room;
