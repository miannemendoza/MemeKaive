import React from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col mb-16 ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      {/* <p className="desc text-left max-w-md">
        {type} and share amazing memes with the world, and come back to it
        whenever you need a good laugh.
      </p> */}

      <p className="desc text-left max-w-md">
        Here, You can add your memes to share it with everyone. Keep it detailed
        and properly tagged. Make sure to not include any slurs, offensive
        language or any hateful speech or else you might get banned and your
        account will be deleted. Visit FAQ if you have any questions.{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism bg-[#f9f9f9]"
      >
        <label htmlFor="">
          <span className="font-semibold text-base text-gray-700">
            Your Meme
          </span>
          <textarea
            onChange={(e) => setPost({ ...post, meme: e.target.value })}
            value={post.meme}
            placeholder="Write your meme here"
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label htmlFor="">
          <span className="font-semibold text-base text-gray-700">
            Tag {` `}
            <span>(#streamer, #twitch, #youtube)</span>
          </span>
          <input
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            value={post.tag}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
