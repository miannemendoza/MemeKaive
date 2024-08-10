"use client";
import MemeCard from "./MemeCard";
import Search from "../components/search";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const getAllMemes = async (textString) => {
  if (textString) {
    const response = await fetch(`/api/meme?search=${textString}`);
    return await response.json();
  } else {
    const response = await fetch("/api/meme");
    return await response.json();
  }
};

const Feed = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const replace = useRouter();
  const fetchPosts = async () => {
    const data = await getAllMemes();
    setPost(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = async (value) => {
    const data = await getAllMemes(value);
    setPost(data);

    const param = new URLSearchParams(searchParams);

    if (value) {
      param.set("search", value);
    } else {
      param.delete("search");
    }

    replace.replace(`${pathName}?${param}`);
  };

  const MemeCardList = ({ data, handleTagClick }) => {
    return (
      <div className="">
        {data.length !== 0 ? (
          <>
            <div className="mt-16 meme_layout">
              {data.map((post) => (
                <MemeCard
                  // @ts-ignore
                  key={post._id}
                  post={post}
                  handleTagClick={handleTagClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-center flex-col ">
            <Image
              src="/assets/images/planet.png"
              alt="empty state"
              width={300}
              height={300}
              className="rounded-full object-contain"
            />
            <span className="text-gray-600">
              Hmm.. Nothing in here. Be the first one to add that meme !
            </span>
          </div>
        )}
      </div>
    );
  };
  const handleTagClick = () => {
    console.log("hooray");
  };

  return (
    <section className="feed">
      <Search handleSearch={handleSearchChange} />
      <div className="mt-3">
        {session?.user && (
          <Link
            href="/create-meme"
            className="outline_btn !bg-green-500 text-center text-sm !text-white justify-center"
          >
            Add Meme
          </Link>
        )}
      </div>
      <MemeCardList data={post} handleTagClick={() => handleTagClick()} />
    </section>
  );
};

export default Feed;
