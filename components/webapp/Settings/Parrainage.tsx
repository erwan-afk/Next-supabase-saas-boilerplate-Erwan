import { UserProfile } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { MySlider } from "../Slider";
import { Checkbox, CheckboxGroup } from "../CheckboxGroup";
import { MyRadioGroup } from "../RadioGroup";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Spinner from "@/components/ui/Spinner";
//import KeyAssociation from "./KeyBind";

type ConfigurationType = {
  referral_code: string;
  referral_count: number;
};

export const Parrainage = () => {
  const [dataConfiguration, setDataConfiguration] = useState<ConfigurationType>(
    {
      referral_code: "",
      referral_count: 0,
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
            referral_code: configData.referral_code,
            referral_count: configData.referral_count,
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
    return <Spinner text="Chargement du parainage ..." />;
  }

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
          sur votre licence. Comme vous le savez, elles ne sont pas éternelles.
          Nous avons donc décidé de vous offrir un crédit de{" "}
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

      <div className="w-full relative">
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 -mt-[8px] -translate-x-[40px] font-PPNeueBit text-goldyellow font-bold text-96 shadow-goldgradient-light">
          {dataConfiguration.referral_code}
        </span>
        <img className="w-full" src="/banner-parrainage.png" alt="" />
      </div>

      <div className="flex flex-row gap-10 items-center">
        <p className="text-16 text-grey-300">Vous avez </p>
        <div className="flex flex-row gap-5 justify-center items-center rounded-16 bg-blur px-20 h-[40px] font-bold text-grey-200 uppercase">
          <span className="text-grey-200">
            {dataConfiguration.referral_count}
          </span>
          {"  "}
          <span className="text-grey-400"> PARRAINAGE</span>
        </div>
        <p className="text-16 text-grey-300">à votre actif.</p>
      </div>
    </>
  );
};
