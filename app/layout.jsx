import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { Space_Grotesk } from "next/font/google";
const openSans = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "MemeKaive",
  description: "Share and Save your memorable memes",
};
const RootLayout = ({ children }) => {
  return (
    <html
      className={`${openSans.className} overflow-y-scroll no-scrollbar`}
      data-theme="light"
    >
      <body>
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
