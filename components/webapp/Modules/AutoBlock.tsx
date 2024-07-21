import { UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import KeyAssociation from "./KeyBind";
import Spinner from "@/components/ui/Spinner";
import { ViewConfig } from "../Configuration";

const ConfigDefaultAutoBlock = {
  DM: {
    min: 10,
    max: 500,
  },
  CD: {
    min: 10,
    max: 500,
  },
};

type ConfigurationType = {
  AutoBlock_DM: number;
  AutoBlock_CD: number;
  AutoBlock_radio: string;
  AutoBlock_keybind: string;
};

interface AutoclickerProps {
  isActive: boolean;
  toggleFeatureStatus: (view: keyof ViewConfig) => void;
}

export const AutoBlock: React.FC<AutoclickerProps> = ({
  isActive,
  toggleFeatureStatus,
}) => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      AutoBlock_DM: 140,
      AutoBlock_CD: 370,
      AutoBlock_radio: "",
      AutoBlock_keybind: "K",
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
          .from("Configuration_AutoBlock")
          .select("*")
          .eq("id", userData.user.id);

        if (configError) {
          console.error("Error fetching configuration:", configError);
        } else if (configuration && configuration.length > 0) {
          const configData = configuration[0];
          console.log("Configuration fetched:", configData);
          setDataConfiguration({
            AutoBlock_DM: configData.AutoBlock_DM,
            AutoBlock_CD: configData.AutoBlock_CD,
            AutoBlock_radio: configData.AutoBlock_radio,
            AutoBlock_keybind: configData.AutoBlock_KeyBind,
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
        .from("Configuration_AutoBlock")
        .update({
          [field]: value,
        })
        .eq("id", userData.user.id);

      if (updateError) {
        console.error("Error updating configuration:", updateError);
      } else {
        const { data: updatedConfiguration, error: fetchError } = await supabase
          .from("Configuration_AutoBlock")
          .select("*")
          .eq("id", userData.user.id);

        if (fetchError) {
          console.error("Error fetching updated configuration:", fetchError);
        } else if (updatedConfiguration && updatedConfiguration.length > 0) {
          const configData = updatedConfiguration[0];
          setDataConfiguration({
            AutoBlock_DM: configData.AutoBlock_DM,
            AutoBlock_CD: configData.AutoBlock_CD,
            AutoBlock_radio: configData.AutoBlock_radio,
            AutoBlock_keybind: configData.AutoBlock_KeyBind, // Notez le changement ici
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
    return <Spinner text="Chargement de l'autoblock ..." />;
  }

  return (
    <>
      <div className="flex flex-col gap-10 p-25">
        <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500 ">
          <div className="flex flex-row gap-25">
            <div className="flex">
              <img src="/minecraft-item/autoblock.png" alt="" />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                Auto Block
              </h1>
              <p className="text-20">CONFIGURATION</p>
            </div>
          </div>
          <div className="flex flex-col  items-center">
            <div className="button b2" id="button-13">
              <input
                onClick={() => toggleFeatureStatus("AutoBlock")}
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
            Ce module permet de{" "}
            <span className="font-bold text-grey-100">
              parer les coups facilement à votre place.{" "}
            </span>
            C’est utile pour diviser les dégats en jeu et faire du Hit&Block.
          </p>
        </div>
        <div className="flex-1 ">
          <KeyAssociation
            keyBind={dataConfiguration.AutoBlock_keybind}
            onChange={handleKeyBind}
            module="Autoblock"
          />
        </div>
      </div>
      <div className="flex flex-row px-25">
        <div className="flex-1 pr-50 flex items-center">
          <MyRadioGroup
            options={["MANUEL", "AUTOMATIQUE"]}
            selectedValue={dataConfiguration.AutoBlock_radio}
            onChange={handleRadioChange}
            label="Sélectionnez une option"
          />
        </div>
        <div className="flex-1 flex flex-col gap-20">
          <h1 className="text-grey-200 font-bold text-20">DURÉE MAXIMALE :</h1>
          <MySlider
            label="DM"
            key="DM"
            min={ConfigDefaultAutoBlock.DM.min}
            max={ConfigDefaultAutoBlock.DM.max}
            unite="MS"
            onChangeEnd={(value) => handleChangeDM(value[0])}
            value={[dataConfiguration.AutoBlock_DM]}
            thumbLabels={["value"]}
          />
        </div>
      </div>
      <div className="flex flex-row pt-50 px-25">
        <div className="flex-1 pr-50 flex items-center"></div>
        <div className="flex-1 flex flex-col gap-20">
          <h1 className="text-grey-200 font-bold text-20">COOLDOWN</h1>
          <MySlider
            label="DM"
            key="DM"
            min={ConfigDefaultAutoBlock.CD.min}
            max={ConfigDefaultAutoBlock.CD.max}
            unite="MS"
            onChangeEnd={(value) => handleChangeCD(value[0])}
            value={[dataConfiguration.AutoBlock_CD]}
            thumbLabels={["value"]}
          />
        </div>
      </div>

      <div className="p-25"></div>
      <div className="p-25"></div>
    </>
  );
};
