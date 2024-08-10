import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { Space_Grotesk } from "next/font/google";
import React from "react";
const openSans = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "MemeKaive",
  description: "Share and Save your memorable memes",
  // icons: {
  //   icon: "./favicon.ico",
  // },
};
const RootLayout = ({ children }) => {
  return (
    <html
      className={`${openSans.className} overflow-y-scroll no-scrollbar`}
      data-theme="light"
    >
      <body>
        <link rel="icon" href="/images/mk.png" sizes="any" />
        <Provider>
          <Nav />
          <main className={`antialiased app min-h-screen`}>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
