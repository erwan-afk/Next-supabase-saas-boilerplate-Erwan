"use client";
import React from "react";
import useUser from "../hook/useUser";
import Post from "./components/Post";
import Price from "@/components/subscription/price";
import Navbar from "@/components/Navbar";
export default function Page() {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return <></>;
  }

  const isActive = !user?.subscription?.end_at
    ? false
    : new Date(user.subscription.end_at) > new Date();

  return (
    <div>
      {/* <h1>This is subscription page</h1> */}

      <div>
        {isActive ? (
          <Post />
        ) : (
          <div className="max-w-6xl min-h-screen mx-auto py-10 space-y-10 px-5 xl:px-0">
            <Navbar />
            <h1 className="text-center text-3xl font-bold">
              You need to subscribe to see the data
            </h1>
            <Price />
          </div>
        )}
      </div>
    </div>
  );
}
