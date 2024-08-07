"use client";

import React, { useEffect } from "react";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
const Editmeme = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memeId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ meme: "", tag: "" });

  useEffect(() => {
    const getmemeDetails = async () => {
      const response = await fetch(`/api/meme/${memeId}`);
      const data = await response.json();

      setPost({
        meme: data.meme,
        tag: data.tag,
      });
    };

    if (memeId) getmemeDetails();
  }, [memeId]);

  const updatememe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!memeId) {
      return alert("Meme ID not found");
    } else {
      try {
        const response = await fetch(`/api/meme/${memeId}`, {
          method: "PATCH",
          body: JSON.stringify({
            meme: post.meme,
            tag: post.tag,
          }),
        });
        console.log(response);
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatememe}
      />
    </div>
  );
};

export default Editmeme;
