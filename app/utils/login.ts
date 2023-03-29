import short from "short-uuid";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const gameNames = ["Alfred", "Wizard", "Dragon", "Robert", "King"];

const name = gameNames[Math.floor(Math.random() * gameNames.length)];

export const guestUser = {
  id: short().generate(),
  name,
  avatar: avatars[Math.floor(Math.random() * avatars.length)],
};
