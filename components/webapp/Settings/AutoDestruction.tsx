import { BinDestruct, UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import KeyAssociation from "../Modules/KeyBind";
import Spinner from "@/components/ui/Spinner";
//import KeyAssociation from "./KeyBind";

type ConfigurationType = {
  AutoDestruction_keybind: string;
  AutoDestruction_checkboxes: string[] | null;
};

export const AutoDestruction = () => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      AutoDestruction_keybind: "L",
      AutoDestruction_checkboxes: [],
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
            AutoDestruction_keybind: configData.AutoDestruction_keybind,
            AutoDestruction_checkboxes: configData.AutoDestruction_checkboxes,
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
            AutoDestruction_keybind: configData.AutoDestruction_keybind,
            AutoDestruction_checkboxes: configData.AutoDestruction_checkboxes,
          });
        }
      }
    }
  };

  const handleKeyBind = (value: string) => {
    updateConfiguration("AutoDestruction_keybind", value);
  };

  const handleCheckboxChange = (value: string[]) => {
    updateConfiguration("AutoDestruction_checkboxes", value);
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
              <BinDestruct size={48} />
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
          avant que des regards un peu trop intrusifs viennent vous déranger.
        </span>
      </p>
      <div className="min-h-[1px] w-full bg-grey-500"></div>
      <div className="flex w-1/2">
        <KeyAssociation
          red
          keyBind={dataConfiguration.AutoDestruction_keybind}
          onChange={handleKeyBind}
          module="Auto destruction"
        />
      </div>

      <div className="min-h-[1px] w-full bg-grey-500"></div>

      <CheckboxGroup
        value={dataConfiguration.AutoDestruction_checkboxes || []}
        onChange={handleCheckboxChange}
        ariaLabel="Options de destruction"
      >
        <div className="p-10"></div>
        <Checkbox
          value="instantdestruction"
          ariaLabel="Désactiver le compte à rebours de 5 secondes pour auto-détruire instantanément"
        >
          Désactiver le compte à rebours de 5 secondes pour auto-détruire
          instantanément
        </Checkbox>
        <div className="p-10"></div>
        <Checkbox
          value="closetab"
          ariaLabel="Fermer l’onglet web en même temps que le logiciel s’auto-détruit"
        >
          Fermer l’onglet web en même temps que le logiciel s’auto-détruit
        </Checkbox>
      </CheckboxGroup>
    </>
  );
};
