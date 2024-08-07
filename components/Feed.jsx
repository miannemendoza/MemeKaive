"use client";
import MemeCard from "./MemeCard";
import { useEffect, useState } from "react";
const Feed = () => {
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
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <MemeCardList data={post} handleTagClick={() => yadoo()} />
    </section>
  );
};

export default Feed;
