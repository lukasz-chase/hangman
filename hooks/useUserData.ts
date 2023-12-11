import { UserContext } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { useContext } from "react";
//types
import type { userContextTypes } from "@/types/context";

const useUserData = () => {
  const { data: session } = useSession();
  const { user }: userContextTypes = useContext(UserContext);

  const playerId = session?.user.id ?? user.id;
  const name = session?.user?.name ?? user.name;
  const playerAvatar = session?.user?.image ?? user.avatar;

  return { playerId, name, playerAvatar };
};

export default useUserData;
