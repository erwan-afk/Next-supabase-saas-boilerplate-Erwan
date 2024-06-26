import React from "react";
import { UserProfile } from "../icons/icons";

interface FeatureCardProps {
  onEditView: () => void; // Nouvelle fonction pour gérer la vue de modification
  imageUrl: string;
  touche?: string;
  titre: string;
  selected: boolean;
  isActive: boolean;
  isFavorite: boolean;
  toggleActive: () => void;
  toggleFavorite: () => void;
  showcase?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  onEditView, // Renommé pour gérer la vue de modification
  imageUrl,
  touche,
  titre,
  selected,
  isActive,
  isFavorite,
  toggleActive,
  toggleFavorite,
  showcase,
}) => {
  return (
    <div
      className={`flex flex-col rounded-16 bg-blur border-2 p-25 items-center justify-between cursor-pointer transition-all ease-in-out duration-200 
        ${showcase ? "flex-1" : "min-h-[300px]"} 
        ${isActive ? "border-blur" : "border-goldyellow"}`}
      onClick={showcase ? undefined : toggleActive}
    >
      <div className="flex flex-row justify-between w-full cursor-pointer">
        <button
          className={`text-12 font-bold p-2 rounded-8 tracking-wider transition-all ease-in-out duration-200 ${
            isActive ? "bg-blur text-grey-300" : "bg-goldyellow text-grey-600"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Empêche le déclenchement du onClick du conteneur parent
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
            e.stopPropagation();
            toggleFavorite();
          }}
        />
      </div>
      <div className="flex flex-col w-full items-center">
        <img className="w-[64px] h-[64px]" src={imageUrl} />
        <p
          className={`font-PPNeueBit text-36 ${
            isActive ? " text-grey-300" : "text-goldyellow"
          }`}
        >
          {titre}
        </p>

        {showcase && <p className="text-20 text-grey-400">RACCOURCI</p>}
        {!showcase && touche && (
          <p className="text-20 text-grey-400">Touche [{touche}]</p>
        )}
      </div>
      {!showcase && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onEditView();
          }}
          className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
        >
          <UserProfile size={20} />
          <div className="font-bold tracking-wider ">CONFIGURER</div>
        </div>
      )}
      <div className="h-[0px]">
        <div
          className={`w-[70px] h-[70px] -z-10 rounded-full blur-2xl ${
            showcase ? "translate-y-[-150px]" : "translate-y-[-200px]"
          } bg-goldyellow transition-all ease-in-out duration-200 sticky ${
            isActive ? "opacity-0" : "opacity-40"
          }`}
        ></div>
      </div>
    </div>
  );
};
