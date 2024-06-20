import React from "react";
import { UserProfile } from "../icons/icons";
import { AdvertisingBar } from "./AdvertisingBar";

export const Home = () => {
  return (
    <div className="flex flex-col gap-20 h-full w-full">
      <div className=" flex gap-25 w-full h-fit">
        <div className="bg-render bg-center bg-cover h-full flex-1">
          <div className=" flex flex-col justify-between items-center p-20 bg-blur rounded-16 h-full">
            <div className="w-fit h-fit rounded-8 text-12 text-grey-600 leading-[100%] font-bold p-10 bg-grey-400">
              STATISTIQUE
            </div>
            <div className="h-fit flex flex-col items-center">
              <div className="font-PPNeueBit text-64 leading-[100%] text-goldyellow">
                Hier,
              </div>
              <div className=" text-40 leading-[100%] font-bold text-white align-bottom">
                TU AS GÉNÉRÉ
              </div>
              <div className="font-PPNeueBit text-64 leading-[100%] text-goldyellow">
                103 248 Clics.
              </div>
              <div className=" text-20 leading-[120%] text-center text-grey-300">
                Soit une moyenne de <br /> 1720 clics/heure.
              </div>
            </div>
            <div className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10">
              <UserProfile size={20} />
              <div className="font-blod">VOIR PLUS DE DONNÉES</div>
            </div>
          </div>
        </div>
        <div className="h-full flex-1">a</div>
        <div className="h-full flex-1">
          <div className=" flex flex-col justify-between items-center p-20 bg-blur rounded-16 h-full gap-[40px]">
            <div className="w-fit h-fit rounded-8 text-12 text-grey-600 leading-[100%] font-bold p-10 bg-grey-400">
              STATISTIQUE
            </div>
            <div className="flex flex-col gap-[40px] items-center">
              <div className="h-fit flex flex-col items-center">
                <div className="font-PPNeueBit text-64 leading-[100%] text-goldyellow">
                  Bravo,
                </div>
                <div className=" text-40 leading-[100%] font-bold text-white align-bottom">
                  TU ES FIDÈLE
                </div>
                <div className=" text-20 leading-[120%] text-center text-grey-300">
                  Ton historique de connexion indique <br /> 13 jours
                  d’utilisation à la suite.
                </div>
              </div>

              <div className=" flex flex-col gap-10 ">
                <div className="flex flex-row gap-10">
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                  <div className="w-[20px] h-[20px] bg-goldyellow"></div>
                </div>
              </div>
            </div>

            <div className="w-full h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10">
              <UserProfile size={20} />
              <div className="font-blod">VOIR PLUS DE DONNÉES</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-1 w-full bg-voltred">a</div>
      <AdvertisingBar />
    </div>
  );
};
