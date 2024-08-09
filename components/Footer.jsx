import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer footer-center bg-[#263238e1] h-20 mt-16 text-white p-4 left-0 bottom-0  ">
      <aside>
        <div className="flex ">
          <FaGithub className="text-2xl mx-1" />
          <FaXTwitter className="text-2xl mx-1" />
          <FaInstagram className="text-2xl mx-1" />
          <FaLinkedin className="text-2xl mx-1" />
        </div>
        <p>© MemeKaive {new Date().getFullYear()} </p>
      </aside>
    </footer>
  );
};

export default Footer;
