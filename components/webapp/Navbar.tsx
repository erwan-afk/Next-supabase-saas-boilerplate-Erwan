import React, { useState, useRef, useEffect } from "react";
import { Logo, LogoTitre, NotifAlarm, UserProfile } from "../icons/icons";

interface NavigationProps {
  setView: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ setView }) => {
  return (
    <div className="col-span-10 row-span-1 h-fit flex flex-row justify-between gap-70">
      <div className="flex flex-row gap-[12px] h-[60px] items-center ">
        <div className="drop-shadow-glow w-fit">
          <Logo />
        </div>
        <div className="flex flex-col justify-center ">
          <LogoTitre />
        </div>
      </div>
      <div className="flex-1 flex items-center">
        <div className=" w-fit h-fit rounded-8 text-16 text-grey-600 leading-[100%] font-bold p-10 bg-goldyellow">
          NIVEAU 35
        </div>
        <div className="flex-1 h-[10px] bg-blur">
          <div className="w-[100px] h-[10px] bg-goldyellow"></div>
        </div>
        <div className=" w-fit h-fit rounded-8 text-16 text-goldyellow leading-[100%] font-bold p-10 bg-blur">
          +362 XP
        </div>
      </div>
      <div className="flex flex-row gap-25">
        <button
          className="bg-blur text-grey-300 w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
          onClick={() => setView("home")}
        >
          <NotifAlarm />
        </button>
        <button
          className="bg-blur w-[60px] h-[60px] text-grey-300 rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
          onClick={() => setView("settings")}
        >
          <UserProfile />
        </button>
      </div>
    </div>
  );
};

export const SideNavigation: React.FC<NavigationProps> = ({ setView }) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const offset = -127;

  const handleButtonClick = (view: string, index: number) => {
    setView(view); // Met à jour la vue principale
    moveIndicator(index); // Déplace l'indicateur vers la position index
  };

  const moveIndicator = (index: number) => {
    if (indicatorRef.current) {
      const indicatorElement = indicatorRef.current;
      const translateY = 85 * index + offset;
      indicatorElement.style.transform = `translateY(${translateY}px)`;
    }
  };

  useEffect(() => {
    // Remettre l'indicateur en position par défaut (-1000px) lorsque le composant est monté ou démonté
    if (indicatorRef.current) {
      const indicatorElement = indicatorRef.current;
      indicatorElement.style.transform = `translateY(${offset}px)`;
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="w-fit h-full flex flex-row gap-25 items-center">
        <div className="flex h-fit w-[4px]">
          <div
            ref={indicatorRef}
            className="w-[4px] h-[24px] rounded-r-[50px] bg-goldyellow transition-transform duration-200 ease-in-out"
          ></div>
        </div>
        <div className="h-fit flex flex-col gap-25">
          <button
            className="bg-blur text-grey-300 w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
            onClick={() => handleButtonClick("home", 0)}
          >
            <UserProfile size={20} />
          </button>
          <button
            className="bg-blur w-[60px] h-[60px] text-grey-300 rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
            onClick={() => handleButtonClick("modules", 1)}
          >
            <UserProfile size={20} />
          </button>
          <button
            className="bg-blur w-[60px] h-[60px] text-grey-300 rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
            onClick={() => handleButtonClick("ok", 2)}
          >
            <UserProfile size={20} />
          </button>
          <button
            className="bg-blur w-[60px] h-[60px] text-grey-300 rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
            onClick={() => handleButtonClick("cancel", 3)}
          >
            <UserProfile size={20} />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end">
        <button
          className="bg-voltred/20 w-[60px] h-[60px] text-voltred rounded-16 flex justify-center items-center hover:bg-voltred/30  drop-shadow-glowred transition-all ease-in-out duration-200"
          onClick={() => handleButtonClick("cancel", 3)}
        >
          <UserProfile size={20} />
        </button>
      </div>
    </div>
  );
};