"use client";

import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: any;
};

export const SessionProvider = ({ children, session }: Props) => {
  return (
    <Provider session={session} refetchOnWindowFocus={false}>
      {children}
    </Provider>
  );
};
