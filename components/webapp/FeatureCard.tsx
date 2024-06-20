import React from "react";
import { UserProfile } from "../icons/icons";

interface FeatureCardProps {
  onClick: () => void;
  imageUrl: string;
  touche: string;
  titre: string;
  selected: boolean;
  isActive: boolean;
  isFavorite: boolean;
  toggleActive: () => void;
  toggleFavorite: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  onClick,
  imageUrl,
  touche,
  titre,
  selected,
  isActive,
  isFavorite,
  toggleActive,
  toggleFavorite,
}) => {
  return (
    <div
      className={`min-h-[300px] flex flex-col rounded-16 bg-blur border-2 p-25 items-center justify-between cursor-pointer transition-all ease-in-out duration-200 ${
        selected ? " border-goldyellow" : "border-blur"
      }`}
      onClick={onClick}
    >
      <div className={`flex flex-row justify-between w-full cursor-pointer`}>
        <button
          className={`text-12 font-bold p-2 rounded-8 tracking-wider transition-all ease-in-out duration-200 ${
            isActive ? " bg-blur text-grey-300" : "bg-goldyellow text-grey-600 "
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick of the card
            toggleActive();
          }}
        >
          {isActive ? "DÉSACTIVER" : "ACTIVER"}
        </button>
        <UserProfile
          size={20}
          className={`cursor-pointer transition-all ease-in-out duration-200 ${
            isFavorite ? "text-goldyellow" : "text-blur"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick of the card
            toggleFavorite();
          }}
        />
      </div>
      <div className="flex flex-col w-full items-center">
        <img className="w-[64px] h-[64px]" src={imageUrl} />
        <p className="font-PPNeueBit text-36 text-goldyellow">{titre}</p>
        <p className="text-20 text-grey-400">Touche [{touche}]</p>
      </div>
      <div className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10">
        <UserProfile size={20} />
        <div className="font-bold tracking-wider text-grey-300">Modifier</div>
      </div>
      <div className="h-[0px]">
        <div
          className={`w-[70px] h-[70px] -z-10 rounded-full  blur-2xl  translate-y-[-200px] bg-goldyellow transition-all ease-in-out duration-200 sticky ${
            isActive ? "opacity-0" : "opacity-40"
          }`}
        ></div>
      </div>
    </div>
  );
};
