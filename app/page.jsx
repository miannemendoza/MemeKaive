import React from "react";
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col mt-16 ">
      <h1 className="head_text text-center">
        <span className="  text-black text-6xl text-center ">
          {" "}
          The Meme Archive
        </span>
      </h1>
      <p className="desc text-center  text-black">
        MemeKaive is your ultimate meme wall! It's the perfect place to share
        your favorite memes and revisit them anytime you need a dose of
        nostalgia and laughter.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
