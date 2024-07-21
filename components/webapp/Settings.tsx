"use client";
import React, { useState } from "react";
import { SettingCard } from "./SettingCard";
import {
  BinDestruct,
  CheckUser,
  Discord,
  DownloadAlt,
  Flash,
  Instagram,
  MoveLeft,
  Sword,
  TikTok,
  Twitter,
  UserProfile,
} from "../icons/icons";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import useUser from "@/app/hook/useUser";
import { Checkbox, CheckboxGroup } from "./CheckboxGroup";
import { InfoPerso } from "./Settings/InfoPerso";
import { Parrainage } from "./Settings/Parrainage";
import { GestionLicence } from "./Settings/GestionLicence";
import { AutoDestruction } from "./Settings/AutoDestruction";
import { ConfigWeapon } from "./Settings/ConfigWeapon";

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
        return <InfoPerso />;

      case "Gestiondelalicence":
        return <GestionLicence />;

      case "Telechargement&installation":
        return (
          <>
            <div className="flex flex-col gap-10">
              <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
                <div className="flex flex-row gap-25">
                  <div className="flex items-center text-grey-200">
                    <DownloadAlt size={48} />
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
            <p className="text-grey-300 text-20">
              Afin de garrantir la sécurité de nos utilisateurs, nous avons
              décidé de décentraliser le contrôle du logiciel sur cette
              application web.{" "}
              <span className="text-grey-100">
                Vous pouvez agir dessus à distance
              </span>{" "}
              depuis n’importe quelle page internet, même depuis votre
              téléphone.
            </p>
            <div className="flex flex-row w-full items-center">
              <img src="/tuto1.png" alt="" className="drop-shadow-glowlight " />
              <hr className="min-h-[1px] flex-1 border-dashed " />
              <img src="/tuto2.png" alt="" />
              <hr className="min-h-[1px] flex-1 border-dashed " />
              <img src="/tuto3.png" alt="" />
            </div>
            <div className="min-h-[1px] w-full bg-grey-500"></div>
            <div className="flex flex-col gap-10">
              <div className="w-full rounded-16 bg-blur flex flex-row min-h-[50px] gap-10 justify-center items-center px-20 text-grey-200  cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                <DownloadAlt size={18} />
                <div className="flex flex-row text-16 font-bold">
                  TÉLÉCHARGER
                </div>
              </div>
              <p className="text-grey-400 w-full text-center">Version 2.4.13</p>
            </div>
          </>
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
        return <AutoDestruction />;
      case "Configurationdesarmes":
        return <ConfigWeapon />;
      case "Parrainage":
        return <Parrainage />;

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
              icon={<CheckUser size={20} />}
            />
            <SettingCard
              titre="Gestion de la licence"
              onClick={() => handleFeatureCardClick("Gestiondelalicence")}
              selected={activeView === "Gestiondelalicence"}
              icon={<Flash size={20} />}
            />
            <SettingCard
              titre="Téléchargement & installation"
              onClick={() =>
                handleFeatureCardClick("Telechargement&installation")
              }
              selected={activeView === "Telechargement&installation"}
              icon={<DownloadAlt size={20} />}
            />
            {/* <SettingCard
              titre="Notifications"
              onClick={() => handleFeatureCardClick("Notifications")}
              selected={activeView === "Notifications"}
            /> */}
            <SettingCard
              titre="Auto-destruction du logiciel"
              onClick={() =>
                handleFeatureCardClick("Autodestructiondulogiciel")
              }
              selected={activeView === "Autodestructiondulogiciel"}
              icon={<BinDestruct size={20} />}
            />
            <SettingCard
              titre="Configuration des armes"
              onClick={() => handleFeatureCardClick("Configurationdesarmes")}
              selected={activeView === "Configurationdesarmes"}
              icon={<Sword size={20} />}
            />
            {/* <SettingCard
              titre="Parrainage"
              onClick={() => handleFeatureCardClick("Parrainage")}
              selected={activeView === "Parrainage"}
            /> */}

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
                  <Discord size={20} />
                  <a href="">Notre discord</a>
                </div>
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <TikTok size={20} />
                  <a href="">Notre TikTok</a>
                </div>
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <Twitter size={20} />
                  <a href="">Notre Twitter</a>
                </div>
                <div className="flex flex-row items-center gap-10 text-grey-300  border-t py-1 border-grey-500 hover:text-goldyellow transition-all ease-in-out duration-200">
                  <Instagram size={20} />
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
          <MoveLeft size={20} />
          <p className="font-PPNeueBit text-24 leading-3">Se déconnecter</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-50 gap-25 bg-blur rounded-16">
        {renderView()}
      </div>
    </div>
  );
};
