"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchPosts = async () => {
    if (session && session.user) {
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      fetchPosts();
    }
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-meme?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this meme?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/meme/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={session?.user.name + "'s"}
      desc="Welcome to your own meme wall, check out your own memes here."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
