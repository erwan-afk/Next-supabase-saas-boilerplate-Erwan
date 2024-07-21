import React from "react";
import { UserProfile } from "../icons/icons"; // Assuming UserProfile is the default icon or imported icon

interface SettingCardProps {
  onClick: () => void;
  titre: string;
  selected: boolean;
  icon: React.ReactNode; // This type allows you to pass any React element as an icon
}

export const SettingCard: React.FC<SettingCardProps> = ({
  titre,
  onClick,
  selected,
  icon,
}) => {
  return (
    <div
      className={`flex flex-row h-fit rounded-16 bg-blur px-25 gap-10 py-20 items-center cursor-pointer transition-all ease-in-out duration-200 ${
        selected
          ? "bg-gradient-to-r from-goldgradient-dark to-goldgradient-light text-grey-600"
          : "text-grey-300 hover:bg-blur10"
      }`}
      onClick={onClick}
    >
      {/* Render the icon */}
      <div className="flex-shrink-0">
        {icon || <UserProfile size={20} />}{" "}
        {/* Fallback to UserProfile if no icon is provided */}
      </div>
      <p className="font-PPNeueBit text-24 leading-3">{titre}</p>
    </div>
  );
};
