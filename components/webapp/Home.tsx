import React from "react";
import { ShopBag, StatGraph } from "../icons/icons";
import { AdvertisingBar } from "./AdvertisingBar";
import { Modules } from "./Modules";

export const Home = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-25 h-full w-full">
      <div className="flex gap-25 w-full flex-1">
        <div className="bg-blur flex-1 rounded-16 relative">
          <div className="bg-render bg-center bg-cover h-full">
            <div className="flex flex-col justify-between items-center p-20 h-full">
              <div className="w-fit h-fit rounded-8 text-12 text-grey-600 leading-[100%] font-bold tracking-widest p-10 bg-grey-400">
                STATISTIQUES
              </div>
              <div className="h-fit flex flex-col items-center gap-5">
                <div className="font-PPNeueBit text-64 leading-[100%] text-goldyellow">
                  Hier,
                </div>
                <div className="text-40 leading-[100%] font-bold text-white align-bottom">
                  TU AS GÉNÉRÉ
                </div>
                <div className="font-PPNeueBit text-64 leading-[50%] text-goldyellow">
                  103 248 Clics.
                </div>
                <div className="pt-20 text-20 leading-[120%] text-center text-grey-300">
                  Soit une moyenne de <br /> 1720 clics/heure.
                </div>
              </div>
              <div className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                <StatGraph size={20} />
                <div className="font-blod tracking-wider">
                  VOIR PLUS DE DONNÉES
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blur flex-1 rounded-16 relative">
          <div className="bg-achat bgchange bg-center bg-cover h-full rounded-16 flex flex-col gap-[40px]">
            <div className="flex flex-col h-fit items-center pt-20">
              <div className="w-fit h-fit rounded-8 text-12 text-goldyellow leading-[100%] font-bold p-10 tracking-widest bg-fasleblack">
                EN CE MOMENT !
              </div>
            </div>
            <div className="flex flex-col flex-1 relative">
              {" "}
              {/* Ajout de relative */}
              <div className="h-fit flex flex-col items-center gap-5 font-bold">
                <div className="text-40 leading-[80%] text-fasleblack align-bottom">
                  T-SHIRT
                </div>
                <div className="font-PPNeueBit text-64 leading-[50%] text-fasleblack">
                  Coup de foudre
                </div>
                <div className="pt-15 text-20 leading-[100%] text-center text-fasleblack">
                  [+1 MOIS DE LICENCE OFFERT]
                </div>
              </div>
              <img
                src="/squelette.gif"
                className="absolute inset-0 object-contain w-full h-full transform  translate-x-[-10px] translate-y-[70px] scale-125  z-0" // Maintien du ratio et ajustement de la taille
                alt=""
              />
            </div>
            <div className="flex flex-col h-fit items-center p-20 z-10">
              <div className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-fasleblack gap-10 cursor-pointer hover:bg-[#3f2f02] hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                <ShopBag size={20} />
                <div className="font-blod tracking-wider">ACHETER</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full flex-1 relative">
          <div className="flex flex-col justify-between items-center p-20 bg-blur rounded-16 h-full gap-[40px]">
            <div className="w-fit h-fit rounded-8 text-12 text-grey-600 leading-[100%] font-bold tracking-widest p-10 bg-grey-400">
              STATISTIQUES
            </div>
            <div className="flex flex-col gap-[20px] items-center h-fit">
              <div className="h-fit flex flex-col items-center gap-5">
                <div className="font-PPNeueBit text-64 leading-[50%] text-goldyellow">
                  Bravo,
                </div>
                <div className="pt-20 text-40 leading-[100%] font-bold text-white align-bottom">
                  TU ES FIDÈLE.
                </div>
                <div className="text-20 leading-[120%] text-center text-grey-300">
                  Ton historique de connexion indique <br /> 13 jours
                  d’utilisation à la suite.
                </div>
              </div>
              <div className="h-fit">
                <img
                  src="/fidelity2.png"
                  className="max-h-full " // Limite la hauteur de l'image
                  alt=""
                />
              </div>
            </div>
            <div className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
              <StatGraph size={20} />
              <div className="font-blod tracking-wider">VOIR MON DAYSTREAK</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-fit w-full">
        <Modules setView={setView} showfavorite />
      </div>
      <AdvertisingBar />
    </div>
  );
};
