"use client";
import MemeCard from "./MemeCard";
import Search from "../components/search";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Feed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/meme");
      const data = await response.json();
      setPost(data);
    };

    fetchPosts();
  }, []);

  const MemeCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 meme_layout">
        {data.map((post) => (
          <MemeCard
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
      <Search />
      <div className="mt-3">
        {session?.user && (
          <Link
            href="/create-meme"
            className=" rounded-lg border bg-[#ffc107e7] py-1.5 px-5 text-black transition-all hover:bg-white  text-center text-sm   justify-center"
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
