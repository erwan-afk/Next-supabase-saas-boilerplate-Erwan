import { UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import KeyAssociation from "./KeyBind";
import Spinner from "@/components/ui/Spinner";
import { ViewConfig } from "../Configuration";

const ConfigDefaultFastPlace = {
  CPS: {
    min: 10,
    max: 25,
  },
  TRB: {
    min: 0,
    max: 5,
  },
};

type ConfigurationType = {
  FastPlace_CPS_Min: number;
  FastPlace_CPS_Max: number;
  FastPlace_TRB: number;
  FastPlace_checkboxes: string[] | null;
  FastPlace_radio: string;
  FastPlace_keybind: string;
};

interface AutoclickerProps {
  isActive: boolean;
  toggleFeatureStatus: (view: keyof ViewConfig) => void;
}

export const FastPlace: React.FC<AutoclickerProps> = ({
  isActive,
  toggleFeatureStatus,
}) => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      FastPlace_CPS_Min: 17,
      FastPlace_CPS_Max: 21,
      FastPlace_TRB: 3,
      FastPlace_checkboxes: null,
      FastPlace_radio: "",
      FastPlace_keybind: "K",
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
          .from("Configuration_FastPlace")
          .select("*")
          .eq("id", userData.user.id);

        if (configError) {
          console.error("Error fetching configuration:", configError);
        } else if (configuration && configuration.length > 0) {
          const configData = configuration[0];
          console.log("Configuration fetched:", configData);
          setDataConfiguration({
            FastPlace_CPS_Min: configData.FastPlace_CPS_Min,
            FastPlace_CPS_Max: configData.FastPlace_CPS_Max,
            FastPlace_TRB: configData.FastPlace_TRB,
            FastPlace_checkboxes: configData.FastPlace_checkboxes,
            FastPlace_radio: configData.FastPlace_radio,
            FastPlace_keybind: configData.FastPlace_KeyBind,
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
        .from("Configuration_FastPlace")
        .update({
          [field]: value,
        })
        .eq("id", userData.user.id);

      if (updateError) {
        console.error("Error updating configuration:", updateError);
      } else {
        const { data: updatedConfiguration, error: fetchError } = await supabase
          .from("Configuration_FastPlace")
          .select("*")
          .eq("id", userData.user.id);

        if (fetchError) {
          console.error("Error fetching updated configuration:", fetchError);
        } else if (updatedConfiguration && updatedConfiguration.length > 0) {
          const configData = updatedConfiguration[0];
          setDataConfiguration({
            FastPlace_CPS_Min: configData.FastPlace_CPS_Min,
            FastPlace_CPS_Max: configData.FastPlace_CPS_Max,
            FastPlace_TRB: configData.FastPlace_TRB,
            FastPlace_checkboxes: configData.FastPlace_checkboxes,
            FastPlace_radio: configData.FastPlace_radio,
            FastPlace_keybind: configData.FastPlace_KeyBind, // Notez le changement ici
          });
        }
      }
    }
  };

  const handleChangeCPS = (value: number[]) => {
    updateConfiguration("FastPlace_CPS_Min", value[0]);
    updateConfiguration("FastPlace_CPS_Max", value[1]);
  };

  const handleChangeTRB = (value: number) => {
    updateConfiguration("FastPlace_TRB", value);
  };

  const handleCheckboxChange = (value: string[]) => {
    updateConfiguration("FastPlace_checkboxes", value);
  };

  const handleRadioChange = (value: string) => {
    updateConfiguration("FastPlace_radio", value);
  };

  const handleKeyBind = (value: string) => {
    updateConfiguration("FastPlace_KeyBind", value);
  };

  if (loading) {
    return <Spinner text="Chargement du fastplace ..." />;
  }

  return (
    <>
      <div className="flex flex-col gap-10 p-25">
        <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500 ">
          <div className="flex flex-row gap-25">
            <div className="flex">
              <img src="/minecraft-item/fastplace.png" alt="" />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                Fast Place
              </h1>
              <p className="text-20">CONFIGURATION</p>
            </div>
          </div>
          <div className="flex flex-col  items-center">
            <div className="button b2" id="button-13">
              <input
                onClick={() => toggleFeatureStatus("FastPlace")}
                type="checkbox"
                className="checkbox"
                checked={!isActive}
              />
              <div className="knobs">
                <span></span>
              </div>
              <div className="layer"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-25">
        <div className="flex-1 pr-50">
          <p className="text-20 text-grey-300">
            Ce module permet d'
            <span className="font-bold text-grey-100">
              automatiser le placement de blocs{" "}
            </span>
            lors d’un combat ou d’un MLG. Il imite les mouvements de votre
            souris,{" "}
            <span className="font-bold text-grey-100">
              comme si vous spammiez votre clic-droit.
            </span>
          </p>
        </div>
        <div className="flex-1 ">
          <KeyAssociation
            keyBind={dataConfiguration.FastPlace_keybind}
            onChange={handleKeyBind}
            module="Fast Place"
          />
        </div>
      </div>
      <div className="flex flex-row px-25">
        <div className="flex-1 pr-50 flex items-center">
          <MyRadioGroup
            options={["BUTTERFLY", "BLATANT"]}
            selectedValue={dataConfiguration.FastPlace_radio}
            onChange={handleRadioChange}
            label="Sélectionnez une option"
          />
        </div>
        <div className="flex-1 flex items-center">
          <MySlider
            label="CPS"
            aria-label="Contrôle du volume"
            key="CPS"
            min={ConfigDefaultFastPlace.CPS.min}
            max={ConfigDefaultFastPlace.CPS.max}
            unite="CPS"
            onChangeEnd={handleChangeCPS}
            value={[
              dataConfiguration.FastPlace_CPS_Min,
              dataConfiguration.FastPlace_CPS_Max,
            ]}
            thumbLabels={["start", "end"]}
          />
        </div>
      </div>
      <div className="flex flex-row pt-50 px-25">
        <div className="flex-1 pr-50 flex items-center">
          <CheckboxGroup
            value={dataConfiguration.FastPlace_checkboxes || []}
            onChange={handleCheckboxChange}
            ariaLabel="Options de l'FastPlace"
          >
            <Checkbox
              value="handblock"
              ariaLabel="Fonctionner seulement avec des blocs dans la main"
            >
              Fonctionner seulement avec des blocs dans la main
            </Checkbox>
            <Checkbox
              value="scopeblock"
              ariaLabel="Activer uniquement quand on vise un bloc"
            >
              Activer uniquement quand on vise un bloc
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div className="flex-1 flex flex-col gap-20">
          <h1 className="text-grey-200 font-bold text-20">
            TREMBLEMENT :<span className="text-grey-400"> MOYEN</span>
          </h1>
          <MySlider
            label="TRB"
            key="TRB"
            min={ConfigDefaultFastPlace.TRB.min}
            max={ConfigDefaultFastPlace.TRB.max}
            unite="TRB"
            onChangeEnd={(value) => handleChangeTRB(value[0])}
            value={[dataConfiguration.FastPlace_TRB]}
            thumbLabels={["value"]}
          />
        </div>
      </div>

      <div className="p-25"></div>
      <div className="p-25"></div>
    </>
  );
};
