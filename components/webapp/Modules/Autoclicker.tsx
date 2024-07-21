import { UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import KeyAssociation from "./KeyBind";
import Spinner from "@/components/ui/Spinner";
import { ViewConfig } from "../Configuration";

const ConfigDefaultAutoclicker = {
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
  Autoclicker_CPS_Min: number;
  Autoclicker_CPS_Max: number;
  Autoclicker_TRB: number;
  autoclicker_checkboxes: string[] | null;
  autoclicker_radio: string;
  autoclicker_keybind: string;
};

interface AutoclickerProps {
  isActive: boolean;
  toggleFeatureStatus: (view: keyof ViewConfig) => void;
}

export const Autoclicker: React.FC<AutoclickerProps> = ({
  isActive,
  toggleFeatureStatus,
}) => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      Autoclicker_CPS_Min: 17,
      Autoclicker_CPS_Max: 21,
      Autoclicker_TRB: 3,
      autoclicker_checkboxes: null,
      autoclicker_radio: "",
      autoclicker_keybind: "K",
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfiguration = async () => {
      console.log(`Fetching configuration...`);
      const supabase = supabaseBrowser();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user data:", userError);
        setLoading(false);
        return;
      }

      if (userData?.user?.id) {
        const { data: configuration, error: configError } = await supabase
          .from("Configuration_Autoclicker")
          .select("*")
          .eq("id", userData.user.id);

        if (configError) {
          console.error("Error fetching configuration:", configError);
        } else if (configuration && configuration.length > 0) {
          const configData = configuration[0];
          setDataConfiguration({
            Autoclicker_CPS_Min: configData.Autoclicker_CPS_Min,
            Autoclicker_CPS_Max: configData.Autoclicker_CPS_Max,
            Autoclicker_TRB: configData.Autoclicker_TRB,
            autoclicker_checkboxes: configData.autoclicker_checkboxes,
            autoclicker_radio: configData.autoclicker_radio,
            autoclicker_keybind: configData.Autoclicker_KeyBind,
          });
        }
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
        .from("Configuration_Autoclicker")
        .update({
          [field]: value,
        })
        .eq("id", userData.user.id);

      if (updateError) {
        console.error("Error updating configuration:", updateError);
      } else {
        const { data: updatedConfiguration, error: fetchError } = await supabase
          .from("Configuration_Autoclicker")
          .select("*")
          .eq("id", userData.user.id);

        if (fetchError) {
          console.error("Error fetching updated configuration:", fetchError);
        } else if (updatedConfiguration && updatedConfiguration.length > 0) {
          const configData = updatedConfiguration[0];
          setDataConfiguration({
            Autoclicker_CPS_Min: configData.Autoclicker_CPS_Min,
            Autoclicker_CPS_Max: configData.Autoclicker_CPS_Max,
            Autoclicker_TRB: configData.Autoclicker_TRB,
            autoclicker_checkboxes: configData.autoclicker_checkboxes,
            autoclicker_radio: configData.autoclicker_radio,
            autoclicker_keybind: configData.Autoclicker_KeyBind, // Notez le changement ici
          });
        }
      }
    }
  };

  const handleChangeCPS = (value: number[]) => {
    updateConfiguration("Autoclicker_CPS_Min", value[0]);
    updateConfiguration("Autoclicker_CPS_Max", value[1]);
  };

  const handleChangeTRB = (value: number) => {
    updateConfiguration("Autoclicker_TRB", value);
  };

  const handleCheckboxChange = (value: string[]) => {
    updateConfiguration("autoclicker_checkboxes", value);
  };

  const handleRadioChange = (value: string) => {
    updateConfiguration("autoclicker_radio", value);
  };

  const handleKeyBind = (value: string) => {
    updateConfiguration("Autoclicker_KeyBind", value);
  };

  if (loading) {
    return <Spinner text="Chargement de l'autoclicker ..." />;
  }

  return (
    <>
      {/* <MySlider
        label="CPS"
        aria-label="Contrôle du volume"
        key="CPS"
        min={ConfigDefaultAutoclicker.CPS.min}
        max={ConfigDefaultAutoclicker.CPS.max}
        unite="CPS"
        onChangeEnd={handleChangeCPS}
        value={[
          dataConfiguration.Autoclicker_CPS_Min,
          dataConfiguration.Autoclicker_CPS_Max,
        ]}
        thumbLabels={["start", "end"]}
      />
      <MySlider
        label="TRB"
        key="TRB"
        min={ConfigDefaultAutoclicker.TRB.min}
        max={ConfigDefaultAutoclicker.TRB.max}
        unite="TRB"
        onChangeEnd={(value) => handleChangeTRB(value[0])}
        value={[dataConfiguration.Autoclicker_TRB]}
        thumbLabels={["value"]}
      />
      <MyRadioGroup
        options={["Option 1", "Option2", "Option3"]}
        selectedValue={dataConfiguration.autoclicker_radio}
        onChange={handleRadioChange}
        label="Sélectionnez une option"
      /> */}

      <div className="flex flex-col gap-50 p-25">
        <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500 ">
          <div className="flex flex-row gap-25">
            <div className="flex">
              <img src="/minecraft-item/autoclicker.png" alt="" />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-48 leading-8 font-bold font-PPNeueBit text-goldyellow">
                Auto Clicker
              </h1>
              <p className="text-20">CONFIGURATION</p>
            </div>
          </div>
          <div className="flex flex-col  items-center">
            <div className="button b2" id="button-13">
              <input
                onClick={() => toggleFeatureStatus("AutoClicker")}
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
      <div className="flex flex-1 px-25 ">
        <div className="flex-1 pr-50">
          <p className="text-20 text-grey-300">
            Ce module permet d’imiter{" "}
            <span className="font-bold text-grey-100">
              les mouvements de clics{" "}
            </span>
            d’un combat. Très précis, il offre un grand nombre d’options{" "}
            <span className="font-bold text-grey-100">
              à personnaliser selon vos habitudes.
            </span>
          </p>
        </div>
        <div className="flex-1 ">
          <KeyAssociation
            keyBind={dataConfiguration.autoclicker_keybind}
            onChange={handleKeyBind}
            module="Autoclicker"
          />
        </div>
      </div>
      <div className="flex flex-row px-25">
        <div className="flex-1 pr-50 flex items-center">
          <MyRadioGroup
            options={["JITTER", "BUTTERFLY", "BLATANT"]}
            selectedValue={dataConfiguration.autoclicker_radio}
            onChange={handleRadioChange}
            label="Sélectionnez une option"
          />
        </div>
        <div className="flex-1 flex items-center">
          <MySlider
            label="CPS"
            aria-label="Contrôle du volume"
            key="CPS"
            min={ConfigDefaultAutoclicker.CPS.min}
            max={ConfigDefaultAutoclicker.CPS.max}
            unite="CPS"
            onChangeEnd={handleChangeCPS}
            value={[
              dataConfiguration.Autoclicker_CPS_Min,
              dataConfiguration.Autoclicker_CPS_Max,
            ]}
            thumbLabels={["start", "end"]}
          />
        </div>
      </div>
      <div className="flex flex-row pt-50 px-25">
        <div className="flex-1 pr-50 flex items-center">
          <CheckboxGroup
            value={dataConfiguration.autoclicker_checkboxes || []}
            onChange={handleCheckboxChange}
            ariaLabel="Options de l'autoclicker"
          >
            <Checkbox
              value="autoclickermenu"
              ariaLabel="Activer l'autoclicker dans les menus"
            >
              Activer l'autoclicker dans les menus
            </Checkbox>
            <Checkbox value="weapons" ariaLabel="Uniquement sur les armes">
              Uniquement sur les armes
            </Checkbox>
            <Checkbox value="blocks" ariaLabel="Pouvoir casser les blocs">
              Pouvoir casser les blocs
            </Checkbox>
            <Checkbox value="hit" ariaLabel="Activer la hit sélection">
              Activer la hit sélection
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
            min={ConfigDefaultAutoclicker.TRB.min}
            max={ConfigDefaultAutoclicker.TRB.max}
            unite="TRB"
            onChangeEnd={(value) => handleChangeTRB(value[0])}
            value={[dataConfiguration.Autoclicker_TRB]}
            thumbLabels={["value"]}
          />
        </div>
      </div>
      <div className="p-25"></div>
      <div className="p-25"></div>
    </>
  );
};
