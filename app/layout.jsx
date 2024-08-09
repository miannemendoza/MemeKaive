import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
          <div className="main"> </div>
          <main className={`antialiased app`}>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
