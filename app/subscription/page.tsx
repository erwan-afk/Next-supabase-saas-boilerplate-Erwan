"use client";
import React, { useState } from "react";
import useUser from "../hook/useUser";
import Navbar from "@/components/Navbar";
import Price from "@/components/subscription/Price";
import { Modules } from "@/components/webapp/Modules";
import { Settings } from "@/components/webapp/Settings";
import { Home } from "@/components/webapp/Home";
import { Navigation, SideNavigation } from "@/components/webapp/Navbar";

const SubscriptionPage = () => {
  const { data: user, isLoading } = useUser();
  const [view, setView] = useState("home");

  if (isLoading) {
    return <></>;
  }

  const isActive = !user?.subscription?.end_at
    ? false
    : new Date(user.subscription.end_at) > new Date();

  const renderView = () => {
    switch (view) {
      case "settings":
        return <Settings />;
      case "modules":
        return <Modules />;
      case "home":
        return <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <div>
        {isActive ? (
          <div className="bg-falseblack mx-auto max-w-screen-2xl w-full grid grid-cols-10 gap-50 p-50 h-screen grid-rows-layout">
            <Navigation setView={setView} />
            <div className="col-span-10 row-span-9 flex-1 gap-50 grid grid-cols-10 ">
              <SideNavigation setView={setView} />
              <div className="col-span-9 min-h-0 ">{renderView()}</div>
            </div>
          </div>
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
};

export default SubscriptionPage;
