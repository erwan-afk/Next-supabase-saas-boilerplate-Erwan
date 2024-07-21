import { BinDestruct, Sword, UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import KeyAssociation from "../Modules/KeyBind";
import Spinner from "@/components/ui/Spinner";
//import KeyAssociation from "./KeyBind";

type ConfigurationType = {
  Weapons_checkboxes: string[] | null;
};

export const ConfigWeapon = () => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      Weapons_checkboxes: [],
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
            Weapons_checkboxes: configData.Weapons_checkboxes,
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
            Weapons_checkboxes: configData.Weapons_checkboxes,
          });
        }
      }
    }
  };

  const handleCheckboxChange = (value: string[]) => {
    updateConfiguration("Weapons_checkboxes", value);
  };

  if (loading) {
    return <Spinner text="Chargement de l'autodestruction ..." />;
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500">
          <div className="flex flex-row gap-25">
            <div className="flex items-center text-grey-200">
              <Sword size={48} />
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
        Dans cette catégorie, vous pouvez choisir les armes sur lesquelles les
        modules fonctionneront uniquement{" "}
        <span className="text-grey-100">
          en la présence de celle-ci dans votre main
        </span>
        <span className="text-grey-100 underline">
          , lorsque vous utiliserez le logiciel.
        </span>
      </p>
      <div className="min-h-[1px] w-full bg-grey-500"></div>

      <div className="flex flex-row items-center">
        <div className="text-grey-300 text-20">Armes à sélectionner :</div>
        <CheckboxGroup
          value={dataConfiguration.Weapons_checkboxes || []}
          onChange={handleCheckboxChange}
          ariaLabel="Options de destruction"
          line
        >
          <div className="p-10"></div>
          <Checkbox
            value="ironaxe"
            ariaLabel="ironaxe"
            imageSrc="/minecraft-weapon/ironaxe.png"
          ></Checkbox>
          <Checkbox
            value="stick"
            ariaLabel="stick"
            imageSrc="/minecraft-weapon/stick.png"
          ></Checkbox>
          <Checkbox
            value="hand"
            ariaLabel="hand"
            imageSrc="/minecraft-weapon/hand.png"
          ></Checkbox>
          <Checkbox
            value="ironsword"
            ariaLabel="ironsword"
            imageSrc="/minecraft-weapon/ironsword.png"
          ></Checkbox>
          <Checkbox
            value="diamandsword"
            ariaLabel="diamandsword"
            imageSrc="/minecraft-weapon/diamandsword.png"
          ></Checkbox>
        </CheckboxGroup>
      </div>
    </>
  );
};
