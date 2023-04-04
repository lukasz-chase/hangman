import short from "short-uuid";
const avatars = [
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191676/deb7gmlw3iyq4r41kjlx.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191675/bfr0ynxpd8hv8jyxxvir.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191675/hwbuzvi3blxi16xuxl3l.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1680191675/wtym4a2k0vt0xmxdzmzp.png",
];

const gameNames = ["Alfred", "Wizard", "Dragon", "Robert", "King"];

const name = gameNames[Math.floor(Math.random() * gameNames.length)];

export const guestUser = {
  id: short().generate(),
  name,
  avatar: avatars[Math.floor(Math.random() * avatars.length)],
};
