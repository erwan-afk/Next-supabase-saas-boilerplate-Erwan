import React from "react";
import Subscription from "./components/Subscription";
import Navbar from "@/components/Navbar";
export default function Page() {
  return (
    <div className="max-w-6xl min-h-screen mx-auto py-10 space-y-10 px-5 xl:px-0">
      <Navbar />
      <Subscription />
    </div>
  );
}
