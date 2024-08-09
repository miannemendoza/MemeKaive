"use client";
import MemeCard from "./MemeCard";
import Search from "../components/search";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const Feed = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const replace = useRouter();
  const fetchPosts = async () => {
    const response = await fetch("/api/meme");
    console.log(response);
    const data = await response.json();

    setPost(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = async (value) => {
    const response = await fetch(`/api/meme?search=${value}`);
    const data = await response.json();
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
    );
  };
  const yadoo = () => {
    console.log("hooray");
  };
  return (
    <section className="feed">
      <Search handleSearch={handleSearchChange} />
      <div className="mt-3">
        {session?.user && (
          <Link
            href="/create-meme"
            className=" rounded-lg border bg-[#ffc107e7] py-1.5 px-5 dark:text-white text-black transition-all hover:bg-white  text-center text-sm   justify-center"
          >
            Add Meme
          </Link>
        )}
      </div>

      <MemeCardList data={post} handleTagClick={() => yadoo()} />
    </section>
  );
};

export default Feed;
