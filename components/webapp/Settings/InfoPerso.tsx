import {
  CheckUser,
  ConfigSettings,
  UserProfile,
} from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Spinner from "@/components/ui/Spinner";
//import KeyAssociation from "./KeyBind";

function formatReadableDate(isoString: string): string {
  const date = new Date(isoString);

  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedDate = `${dayName}, ${day} ${month} ${year} à ${hours
    .toString()
    .padStart(2, "0")}h${minutes.toString().padStart(2, "0")}`;

  return formattedDate;
}

type ConfigurationType = {
  email: string;
  created_at: string;
};

export const InfoPerso = () => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      email: "",
      created_at: "",
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
            email: configData.email,
            created_at: configData.created_at,
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

  const updateConfiguration = async (field: string, value: any) => {
    console.log(`${field} value changed:`, value);
    setDataConfiguration((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));

    const supabase = supabaseBrowser();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return;
    }

    if (userData?.user?.id) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          [field]: value,
        })
        .eq("id", userData.user.id);

      if (updateError) {
        console.error("Error updating configuration:", updateError);
      } else {
        const { data: updatedConfiguration, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id);

        if (fetchError) {
          console.error("Error fetching updated configuration:", fetchError);
        } else if (updatedConfiguration && updatedConfiguration.length > 0) {
          const configData = updatedConfiguration[0];
          setDataConfiguration({
            email: configData.email,
            created_at: configData.created_at,
          });
        }
      }
    }
  };

  const handleChangeDM = (value: number) => {
    updateConfiguration("AutoBlock_DM", value);
  };

  const handleChangeCD = (value: number) => {
    updateConfiguration("AutoBlock_CD", value);
  };

  const handleRadioChange = (value: string) => {
    updateConfiguration("AutoBlock_radio", value);
  };

  const handleKeyBind = (value: string) => {
    updateConfiguration("AutoBlock_KeyBind", value);
  };

  if (loading) {
    return <Spinner text="Chargement des informations personnelles ..." />;
  }
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
          <div className="flex flex-row gap-25">
            <div className="flex items-center text-grey-200">
              <CheckUser size={48} />
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
            <p className="text-16 text-grey-300">Adresse e-mail : </p>
            <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase">
              {dataConfiguration.email}
            </div>
          </div>
          {/* <div className="flex flex-row gap-10 items-center">
            <p className="text-16 text-grey-300">Licence : </p>
            <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200">
              19B72N24
            </div>
            <div
              //onClick={() => handleFeatureCardClick("Gestiondelalicence")}
              className="rounded-16 bg-blur flex flex-row h-[40px] gap-10 justify-center items-center px-20 text-grey-200 cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
            >
              <UserProfile size={18} />
              <div className="flex flex-row text-16 font-bold ">GÉRER</div>
            </div>
          </div> */}
          <div className="flex flex-row gap-10 items-center">
            <p className="text-16 text-grey-300">Mot de passe : </p>
            <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 password">
              *************
            </div>
            <div className="rounded-16 bg-blur flex flex-row h-[40px] gap-10 justify-center items-center px-20 text-grey-200  cursor-pointer hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
              <div className="flex flex-row text-16 font-bold">MODIFIER</div>
              <ConfigSettings size={18} />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center">
            <p className="text-16 text-grey-300">Membre depuis :</p>
            <div className="flex justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase">
              {formatReadableDate(dataConfiguration.created_at)}
            </div>
          </div>
        </div>
        <div className="w-fit">
          <img className="h-[230px]" src="/RENDER_1.png" alt="" />
        </div>
      </div>

      {/*<div className="h-[1px] w-full bg-grey-500"></div><div className="h-[1px] w-full bg-grey-500"></div> */}
      {/* <CheckboxGroup >
              <Checkbox value="handblock">
                Fonctionner seulement avec des blocs dans la main
              </Checkbox>
              
            </CheckboxGroup> */}
    </>
  );
};
