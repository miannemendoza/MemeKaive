"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    if (session?.user.id) {
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
      name="My"
      desc="Welcome to your personalized profle page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
