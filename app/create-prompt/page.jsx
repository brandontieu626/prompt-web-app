"use client";
import { useState } from "react";
import { useSession } from "next-auth/react"; //Lets you know who is logged in
import { useRouter } from "next/navigation";

import Form from "@components/Form";
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: POST,
        body: JSON.stringify({
          prompt: post.prompt,
          userID: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
