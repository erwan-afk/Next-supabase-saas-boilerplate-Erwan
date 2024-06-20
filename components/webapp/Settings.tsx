"use client";
import React, { useState } from "react";
import { SettingCard } from "./SettingCard";
import { UserProfile } from "../icons/icons";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import useUser from "@/app/hook/useUser";

export const Settings: React.FC = () => {
  const [activeView, setActiveView] = useState<string | null>(
    "Informationspersonnelles"
  );

  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    if (protectedPaths.includes(pathname)) {
      router.replace("/auth?next=" + pathname);
    }
  };

  const handleFeatureCardClick = (view: string) => {
    setActiveView(view);
  };

  const renderView = () => {
    switch (activeView) {
      case "Informationspersonnelles":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Informations personnelles
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Gestiondelalicence":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Gestion de la licence
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Telechargement&installation":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Téléchargement & installation
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Notifications":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Notifications
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Autodestructiondulogiciel":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Auto-destruction du logiciel
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Configurationdesarmes":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Configuration des armes
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Parrainage":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
              <div className="flex flex-row gap-25">
                <div className="flex items-center text-grey-200">
                  <UserProfile size={48} />
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                    Parrainage
                  </h1>
                  <p className="text-20 text-grey-200">PARAMÈTRES</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="">Please select a feature to configure.</div>;
    }
  };

  return (
    <div className="flex flex-row gap-20 h-full w-full overflow-hidden">
      <div className="w-[300px] flex flex-col gap-10 min-h-full overflow-hidden ">
        <div className="flex flex-col gap-10 overflow-hidden no-scrollbar relative ">
          <div className="flex flex-col gap-10 overflow-scroll no-scrollbar rounded-16">
            <SettingCard
              titre="Informations personnelles"
              onClick={() => handleFeatureCardClick("Informationspersonnelles")}
              selected={activeView === "Informationspersonnelles"}
            />
            <SettingCard
              titre="Gestion de la licence"
              onClick={() => handleFeatureCardClick("Gestiondelalicence")}
              selected={activeView === "Gestiondelalicence"}
            />
            <SettingCard
              titre="Téléchargement & installation"
              onClick={() =>
                handleFeatureCardClick("Telechargement&installation")
              }
              selected={activeView === "Telechargement&installation"}
            />
            <SettingCard
              titre="Notifications"
              onClick={() => handleFeatureCardClick("Notifications")}
              selected={activeView === "Notifications"}
            />
            <SettingCard
              titre="Auto-destruction du logiciel"
              onClick={() =>
                handleFeatureCardClick("Autodestructiondulogiciel")
              }
              selected={activeView === "Autodestructiondulogiciel"}
            />
            <SettingCard
              titre="Configuration des armes"
              onClick={() => handleFeatureCardClick("Configurationdesarmes")}
              selected={activeView === "Configurationdesarmes"}
            />
            <SettingCard
              titre="Parrainage"
              onClick={() => handleFeatureCardClick("Parrainage")}
              selected={activeView === "Parrainage"}
            />

            <div
              className={`flex flex-col rounded-16 bg-blur px-25 gap-25 py-20  flex-1   transition-all ease-in-out duration-200 }`}
            >
              <p className=" text-16 text-grey-100">
                <b>Vous faites maintenant partis de la communauté ! </b>
                <span className="text-grey-300">
                  N’hésitez pas à nous suivre sur nos différentes plateformes...
                  à très vite !
                </span>
              </p>

              <div className="flex flex-col font-PPNeueBit text-24 ">
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <UserProfile size={20} />
                  <a href="">Notre discord</a>
                </div>
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <UserProfile size={20} />
                  <a href="">Notre TikTok</a>
                </div>
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <UserProfile size={20} />
                  <a href="">Notre Twitter</a>
                </div>
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <UserProfile size={20} />
                  <a href="">Notre Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row rounded-16 bg-voltred/20 hover:bg-voltred/30 h-fit text-voltred px-25 gap-10 py-20 items-center cursor-pointer transition-all ease-in-out duration-200 sticky bottom-0`}
          onClick={handleLogout}
        >
          <UserProfile size={20} />
          <p className="font-PPNeueBit text-24 leading-3">Se déconnecter</p>
        </div>
      </div>
      <div className="flex-1 p-50 bg-blur rounded-16">{renderView()}</div>
    </div>
  );
};
