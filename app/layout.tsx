import "./globals.css";
import { SocketContextProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/UserContext";
import { GameContextProvider } from "./context/GameContext";
import Nav from "./components/Nav";
import LayoutWrapper from "./components/LayoutWrapper";
import { SessionProvider } from "./components/SessionProvider";
import { Montserrat, Roboto_Mono } from "next/font/google";

export const metadata = {
  title: "Hangman",
  description: "Play a hangman game with friends",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-robotoMono",
});

export default async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <UserContextProvider>
        <SocketContextProvider>
          <GameContextProvider>
            <body>
              <SessionProvider>
                <LayoutWrapper>
                  <div
                    className={`${montserrat.variable} ${robotoMono.variable}  font-montserrat`}
                  >
                    <Nav />
                    {children}
                  </div>
                </LayoutWrapper>
              </SessionProvider>
            </body>
          </GameContextProvider>
        </SocketContextProvider>
      </UserContextProvider>
    </html>
  );
};
