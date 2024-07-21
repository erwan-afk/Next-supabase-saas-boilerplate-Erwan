import { Flash, HandShake, UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Spinner from "@/components/ui/Spinner";
//import KeyAssociation from "./KeyBind";

interface CountdownProps {
  targetDateString?: string;
}

const getCountdown = (targetDateString: string | null) => {
  // Utiliser la date actuelle si la date cible est nulle
  const targetDate = targetDateString ? new Date(targetDateString) : new Date();
  const now = new Date();

  // Calculer la différence en millisecondes
  const differenceInMilliseconds = targetDate.getTime() - now.getTime();

  // Si la date cible est dans le passé, retourner un message approprié
  if (differenceInMilliseconds < 0) {
    return (
      <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase gap-5">
        La date cible est déjà passée.
      </div>
    );
  }

  // Calculer les jours, heures, minutes et secondes restantes
  const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Formater les résultats en JSX
  return (
    <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase gap-5">
      {`${days}`} <span className="text-grey-400">Jours</span> {`${hours}`}{" "}
      <span className="text-grey-400">Heures</span> {`${minutes}`}{" "}
      <span className="text-grey-400">Minutes</span>
    </div>
  );
};

type ConfigurationType = {
  end_at: string | null;
};

export const GestionLicence = () => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      end_at: "",
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfiguration = async () => {
      console.log("Fetching configuration...");
      const supabase = supabaseBrowser();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user data:", userError);
        setLoading(false);
        return;
      }

      console.log("User data:", userData);

      if (userData?.user?.id) {
        const { data: configuration, error: configError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id);

        if (configError) {
          console.error("Error fetching configuration:", configError);
        } else if (configuration && configuration.length > 0) {
          const configData = configuration[0];
          console.log("Configuration fetched:", configData);
          setDataConfiguration({
            end_at: configData.end_at,
          });
        } else {
          console.log("No configuration found for user.");
        }
      } else {
        console.log("No user ID found.");
      }
      setLoading(false);
    };

    fetchConfiguration();
  }, []);

  if (loading) {
    return <Spinner text="Chargement de la licence ..." />;
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
          <div className="flex flex-row gap-25">
            <div className="flex items-center text-grey-200">
              <Flash size={48} />
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
      {/* <div className="flex flex-row items-center">
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
              21.03.2024 {">>"} Vous êtes passé au niveau 4, bravo ! (+5 jours)
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
      <div className="min-h-[1px] w-full bg-grey-500"></div> */}

      <div className="flex flex-row gap-25">
        <div className="flex flex-row gap-10 items-center">
          <p className="text-16 text-grey-300">Expiration : </p>
          {getCountdown(dataConfiguration.end_at)}
        </div>

        <div className="w-fit rounded-16 bg-blur flex flex-row min-h-[50px] gap-10 justify-center items-center px-20 text-grey-200  cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
          <HandShake size={18} />
          <div className="flex flex-row text-16 font-bold">
            GESTION DE MON ABONNEMENT
          </div>
        </div>
      </div>

      {/* <img className="w-full" src="/banner-economy.png" alt="" /> */}
    </>
  );
};
