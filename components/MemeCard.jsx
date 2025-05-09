"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const MemeCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.meme);
    navigator.clipboard.writeText(post.meme);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="meme_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className=" font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            {/* tbd if it should be shown 
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p> */}
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            alt="clipboard_icons"
            src={
              copied === post.meme
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4  text-sm text-gray-700">{post.meme}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="outline_btn !bg-orange-500 !text-white"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="outline_btn !bg-red-500 !text-white"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default MemeCard;
