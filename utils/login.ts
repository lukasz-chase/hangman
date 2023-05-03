import short from "short-uuid";

export const avatarsVersion1 = [
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/zwykly-1_sxaqnb.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432100/hangmanAvatars/zwykly-2_rixaff.jpg",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432100/hangmanAvatars/zwykly-3_vc3ojo.jpg",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432100/hangmanAvatars/zwykly-4_fmo4sb.jpg",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432100/hangmanAvatars/zwykly-5_il1bsb.jpg",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432100/hangmanAvatars/zwykly-6_tjnfrg.png",
];
export const avatarsVersion2 = [
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/zamkniete-1_ti0bny.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/zamkniete-2_rycflz.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/zamkniete-3_mzh1dn.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432100/hangmanAvatars/zamkniete-4_vmuwva.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/zamkniete-5_ktj6nz.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/zamkniete-6_shk5mm.png",
];
export const avatarsVersion3 = [
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/okularki-1_uyzkye.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/okularki-2_sbmqe2.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/okularki-3_y4knk2.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/okularki-4_cpjaaa.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/okularki-5_a5ibsb.png",
  "https://res.cloudinary.com/dmv02zyyo/image/upload/v1682432099/hangmanAvatars/okularki-6_x3w73p.png",
];

export const generateGuestUser = (name: string, avatar: string) => {
  const gameNames = ["Alfred", "Wizard", "Dragon", "Robert", "King"];

  const randomName = gameNames[Math.floor(Math.random() * gameNames.length)];

  return {
    id: short().generate(),
    name: name || randomName,
    avatar,
  };
};
