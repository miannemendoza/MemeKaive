"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { MdModeNight, MdLightMode, MdDarkMode } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
const nav = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //for auth
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full h-20   pt-3 bg-[#2196F3] px-7">
      <Link href="/" className=" flex gap-2 flex-center">
        <Image
          src="/assets/images/b.png"
          alt="MemeKaive logo"
          className="object-contain"
          width={120}
          height={120}
        />
        {/* <p className="logo_text">MemeKaive</p> */}
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden items-center ">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button
              className="outline_btn"
              onClick={() => {
                signOut({ callbackUrl: "/", redirect: true });
                localStorage.setItem("sessionId", "");
              }}
            >
              {" "}
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  {" "}
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown !z-50">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-meme"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    console.log("ara i am clicked");
                  }}
                >
                  Create Meme
                </Link>
                <button
                  type="button"
                  className="outline_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: "/", redirect: true });
                    localStorage.setItem("sessionId", "");
                  }}
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  {" "}
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default nav;
