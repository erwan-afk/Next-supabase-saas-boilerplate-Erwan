"use client";
import React, { useState } from "react";
import { SettingCard } from "./SettingCard";
import { UserProfile } from "../icons/icons";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import useUser from "@/app/hook/useUser";
import { Checkbox, CheckboxGroup } from "./CheckboxGroup";

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
          <>
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
            <div className="flex flex-row items-center">
              <div className="flex-1 pr-50 flex flex-col gap-25">
                <div className="flex flex-row gap-10 items-center">
                  <p className="text-16 text-grey-300">Licence : </p>
                  <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200">
                    19B72N24
                  </div>
                  <div
                    onClick={() => handleFeatureCardClick("Gestiondelalicence")}
                    className="rounded-16 bg-blur flex flex-row h-[40px] gap-10 justify-center items-center px-20 text-grey-200 cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
                  >
                    <UserProfile size={18} />
                    <div className="flex flex-row text-16 font-bold ">
                      GÉRER
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-10 items-center">
                  <p className="text-16 text-grey-300">Mot de passe : </p>
                  <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200">
                    aaaaaaaaaaaaaaaaa
                  </div>
                  <div className="rounded-16 bg-blur flex flex-row h-[40px] gap-10 justify-center items-center px-20 text-grey-200  cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                    <div className="flex flex-row text-16 font-bold">
                      MODIFIER
                    </div>
                    <UserProfile size={18} />
                  </div>
                </div>
                <div className="flex flex-row gap-10 items-center">
                  <p className="text-16 text-grey-300">Date d’activation :</p>
                  <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200">
                    LE 04 AVRIL 2024 À 16H36
                  </div>
                </div>
              </div>
              <div className="w-fit">
                <img className="h-[230px]" src="/RENDER_1.png" alt="" />
              </div>
            </div>
            <div className="h-[1px] w-full bg-grey-500"></div>

            <div className="flex flex-row gap-10 items-center">
              <p className="text-16 text-grey-300">Adresse e-mail : </p>
              <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase">
                matthieu.volt@gmail.com
              </div>
            </div>

            <div className="h-[1px] w-full bg-grey-500"></div>
            {/* <CheckboxGroup >
              <Checkbox value="handblock">
                Fonctionner seulement avec des blocs dans la main
              </Checkbox>
              
            </CheckboxGroup> */}
          </>
        );
      case "Gestiondelalicence":
        return (
          <>
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
            <div className="flex flex-row items-center">
              <div className="flex-1 pr-50 flex flex-col gap-25">
                <div className="flex flex-row gap-10 items-center">
                  <h1 className="text-20 text-grey-300">
                    Historique des évenements relatifs à votre licence :{" "}
                  </h1>
                </div>
                <div className="flex flex-col ">
                  <p className=" text-goldyellow">
                    04.04.2024 {">>"} Vous avez acheté 3 mois de licence
                  </p>
                  <p className="text-grey-200">
                    25.03.2024 {">>"} Vous avez parrainé quelqu’un (+3 jours)
                  </p>
                  <p className="text-grey-300">
                    21.03.2024 {">>"} Vous êtes passé au niveau 4, bravo ! (+5
                    jours)
                  </p>
                  <p className="text-grey-400">
                    17.03.2024 {">>"} Vous avez parrainé quelqu’un (+3 jours)
                  </p>
                  <p className="text-grey-500">
                    08.03.2024 {">>"} Vous avez parrainé quelqu’un (+3 jours)
                  </p>
                </div>
              </div>
              <div className="w-fit">
                <img
                  className="h-[230px] transform rotate-12"
                  src="/LICENCE.png"
                  alt=""
                />
              </div>
            </div>
            <div className="min-h-[1px] w-full bg-grey-500"></div>

            <div className="flex flex-row gap-10 items-center">
              <p className="text-16 text-grey-300">Expiration : </p>
              <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase gap-5">
                16 <span className="text-grey-400">Jours</span> 05{" "}
                <span className="text-grey-400">heures</span> 35
                <span className="text-grey-400">MINUTES</span>
              </div>
            </div>

            <div className="w-full rounded-16 bg-blur flex flex-row min-h-[50px] gap-10 justify-center items-center px-20 text-grey-200  cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
              <UserProfile size={18} />
              <div className="flex flex-row text-16 font-bold">
                GESTION DE MON ABONNEMENT
              </div>
            </div>

            <img className="w-full" src="/banner-economy.png" alt="" />
          </>
        );
      case "Telechargement&installation":
        return (
          <>
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
                <UserProfile size={18} />
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
        return (
          <>
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
            <p className="text-grey-300 text-20">
              Auto-détruire votre logiciel permet de{" "}
              <span className="text-grey-100">
                ne laisser aucune trace sur votre ordinateur.
              </span>{" "}
              surtout si vous souhaitez vous en séparer{" "}
              <span className="text-grey-100 underline">
                {" "}
                avant que des regards un peu trop intrusifs viennent vous
                déranger.
              </span>
            </p>
            <div className="min-h-[1px] w-full bg-grey-500"></div>
            <div className="w-fit bg-blur rounded-16 flex flex-row justify-end p-25 items-center h-fit ">
              <div>
                <p className="text-20 text-grey-100 font-bold">
                  TOUCHE ASSOCIÉE : K
                </p>
                <p className="text-16 text-grey-300 w-[280px]">
                  Clique-ici pour changer la touche associée au module{" "}
                  <span className="font-bold text-grey-200">Auto Clicker.</span>
                </p>
              </div>
              <div>
                <div className="w-[64px] h-[64px] rounded-8 border-2 text-voltred border-voltred bg-touche bg-cover drop-shadow-glowred flex items-center justify-center font-bold text-24">
                  K
                </div>
              </div>
            </div>
            <div className="min-h-[1px] w-full bg-grey-500"></div>
          </>
        );
      case "Configurationdesarmes":
        return (
          <>
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
            <p className="text-grey-300 text-20">
              Dans cette catégorie, vous pouvez choisir les armes sur lesquelles
              les modules fonctionneront uniquement{" "}
              <span className="text-grey-100">
                en la présence de celle-ci dans votre main
              </span>
              <span className="text-grey-100 underline">
                , lorsque vous utiliserez le logiciel.
              </span>
            </p>
            <div className="min-h-[1px] w-full bg-grey-500"></div>
          </>
        );
      case "Parrainage":
        return (
          <>
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
            <div>
              <p className="text-grey-300 text-20">
                Parrainer un ami permet de{" "}
                <span className="text-grey-100 font-bold">
                  gagner des jours supplémentaires{" "}
                </span>
                sur votre licence. Comme vous le savez, elles ne sont pas
                éternelles. Nous avons donc décidé de vous offrir un crédit de{" "}
                <span className="text-goldyellow underline">
                  +2 jours d’abonnement
                </span>{" "}
                supplémentaires à chaque fois que vous parraînerez un ami.
              </p>
              <p className="text-grey-300 text-20">
                Votre ami doit renseigner votre code de parrainage{" "}
                <span className="text-grey-100 font-bold">
                  lors de l’achat d’une licence{" "}
                </span>
                et il pourra alors{" "}
                <span className="text-goldyellow underline">
                  bénéficier de -10% sur son achat.
                </span>{" "}
              </p>
            </div>
            <div className="min-h-[1px] w-full bg-grey-500"></div>

            <img className="w-full" src="/banner-parrainage.png" alt="" />
          </>
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
      <div className="flex-1 flex flex-col p-50 gap-50 bg-blur rounded-16">
        {renderView()}
      </div>
    </div>
  );
};
