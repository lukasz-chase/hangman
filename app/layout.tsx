import "./globals.css";
import { SocketContextProvider } from "./context/SocketContext";
import Nav from "./components/Nav";
import LayoutWrapper from "./components/LayoutWrapper";
import { SessionProvider } from "./components/SessionProvider";
import { Montserrat, Roboto_Mono } from "next/font/google";
import { UserContextProvider } from "./context/UserContext";
// import { getServerSession } from "next-auth";
// import { AuthOptions } from "@/pages/api/auth/[...nextauth]";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(AuthOptions);
  return (
    <html lang="en">
      <UserContextProvider>
        <SocketContextProvider>
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
        </SocketContextProvider>
      </UserContextProvider>
    </html>
  );
}
