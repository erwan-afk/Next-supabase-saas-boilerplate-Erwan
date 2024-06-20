import React from "react";
import { UserProfile } from "../icons/icons";

interface SettingCardProps {
  onClick: () => void;
  titre: string;
  selected: boolean;
}

export const SettingCard: React.FC<SettingCardProps> = ({
  titre,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`flex flex-row h-fit rounded-16 bg-blur px-25 gap-10 py-20 items-center  cursor-pointer transition-all ease-in-out duration-200 ${
        selected
          ? " bg-gradient-to-r from-goldgradient-dark to-goldgradient-light text-grey-600 "
          : " text-grey-300 hover:bg-blur10"
      }`}
      onClick={onClick}
    >
      <UserProfile size={20} />
      <p className="font-PPNeueBit text-24 leading-3">{titre}</p>
    </div>
  );
};
