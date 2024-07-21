import React, { useState, useEffect } from "react";
import { FeatureCard } from "./FeatureCard";
import { Add, Star, SuggestFeature, UserProfile } from "../icons/icons";
import { useViewConfig, ViewConfig } from "./Configuration";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Autoclicker } from "./Modules/Autoclicker";
import { FastPlace } from "./Modules/FastPlace";
import { AutoBlock } from "./Modules/AutoBlock";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import Spinner from "../ui/Spinner";
import Link from "next/link";

interface FeatureStatus {
  view: string;
  isActive: boolean;
}

interface FeatureFavoriteStatus {
  view: string;
  isFavorite: boolean;
}

interface ModulesProps {
  showfavorite?: boolean;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

export const Modules: React.FC<ModulesProps> = ({ showfavorite, setView }) => {
  const { viewConfig, updateViewConfig } = useViewConfig();
  const [activeView, setActiveView] = useState<keyof ViewConfig>("AutoClicker");

  type ViewNames = keyof ViewConfig;

  const handleGenericChange = <T extends keyof ViewConfig>(
    view: T,
    key: keyof ViewConfig[T],
    value: any
  ) => {
    updateViewConfig(view, { [key]: value } as Partial<ViewConfig[T]>);
  };

  const handleSliderChange =
    <T extends keyof ViewConfig>(view: T, key: keyof ViewConfig[T]) =>
    (value: number | [number, number]) => {
      console.log(`Updating ${view}.${String(key)} to`, value);
      handleGenericChange(view, key, value);
    };

  const handleRadioChange =
    <T extends keyof ViewConfig>(view: T) =>
    (value: string) => {
      handleGenericChange(view, "selectedOption", value);
    };

  const handleCheckboxChange =
    <T extends keyof ViewConfig>(view: T) =>
    (value: string[]) => {
      handleGenericChange(view, "selected", value);
    };

  const handleFeatureCardClick = (view: string) => {
    if (setView) {
      setView(view); // Update the view in SubscriptionPage
    }
  };

  const handleFeatureCardClickSetting = <T extends keyof ViewConfig>(
    view: T
  ) => {
    setActiveView(view); // Update the active view
  };

  // Fetch and save data from/to Supabase
  const [featureStatus, setFeatureStatus] = useState<FeatureStatus[]>([]);
  const [featureFavoriteStatus, setFeatureFavoriteStatus] = useState<
    FeatureFavoriteStatus[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeatureStatus = async () => {
      setLoading(true);
      const supabase = supabaseBrowser();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user data:", userError);
        setLoading(false);
        return;
      }

      if (userData?.user?.id) {
        const { data: moduleData, error: moduleError } = await supabase
          .from("Modules")
          .select("*")
          .eq("id", userData.user.id);

        if (moduleError) {
          console.error("Error fetching modules:", moduleError);
        } else if (moduleData && moduleData.length > 0) {
          const moduleConfig = moduleData[0];
          setFeatureStatus([
            { view: "AutoClicker", isActive: !moduleConfig.autoclicker_active },
            { view: "FastPlace", isActive: !moduleConfig.fastplace_active },
            { view: "AutoBlock", isActive: !moduleConfig.autoblock_active },
            {
              view: "RandomFeature",
              isActive: !moduleConfig.randomfeature_active,
            },
          ]);
          setFeatureFavoriteStatus([
            {
              view: "AutoClicker",
              isFavorite: moduleConfig.autoclicker_favorite,
            },
            { view: "FastPlace", isFavorite: moduleConfig.fastplace_favorite },
            { view: "AutoBlock", isFavorite: moduleConfig.autoblock_favorite },
            {
              view: "RandomFeature",
              isFavorite: moduleConfig.randomfeature_favorite,
            },
          ]);
        }
      }
      setLoading(false);
    };

    fetchFeatureStatus();
  }, []);

  const updateModuleStatus = async (view: string, isActive: boolean) => {
    setActionLoading(true);
    const supabase = supabaseBrowser();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user data:", userError);
      setActionLoading(false);
      return;
    }

    if (userData?.user?.id) {
      const { error: updateError } = await supabase
        .from("Modules")
        .update({ [`${view.toLowerCase()}_active`]: !isActive })
        .eq("id", userData.user.id);

      if (updateError) {
        console.error("Error updating module status:", updateError);
      }
    }
    setActionLoading(false);
  };

  const updateFavoriteStatus = async (view: string, isFavorite: boolean) => {
    setActionLoading(true);
    const supabase = supabaseBrowser();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user data:", userError);
      setActionLoading(false);
      return;
    }

    if (userData?.user?.id) {
      const { error: updateError } = await supabase
        .from("Modules")
        .update({ [`${view.toLowerCase()}_favorite`]: isFavorite })
        .eq("id", userData.user.id);

      if (updateError) {
        console.error("Error updating favorite status:", updateError);
      }
    }
    setActionLoading(false);
  };

  const toggleFeatureStatus = (view: ViewNames) => {
    setFeatureStatus((prevStatus) => {
      const newStatus = prevStatus.map((feature) =>
        feature.view === view
          ? { ...feature, isActive: !feature.isActive }
          : feature
      );
      const updatedFeature = newStatus.find((feature) => feature.view === view);
      if (updatedFeature) {
        updateModuleStatus(updatedFeature.view, updatedFeature.isActive);
      }
      return newStatus;
    });
  };

  const toggleFavoriteStatus = (view: ViewNames) => {
    setFeatureFavoriteStatus((prevStatus) => {
      const newStatus = prevStatus.map((feature) =>
        feature.view === view
          ? { ...feature, isFavorite: !feature.isFavorite }
          : feature
      );
      const updatedFeature = newStatus.find((feature) => feature.view === view);
      if (updatedFeature) {
        updateFavoriteStatus(updatedFeature.view, updatedFeature.isFavorite);
      }
      return newStatus;
    });
  };

  const getFeatureStatus = (view: string) => {
    const feature = featureStatus.find((feature) => feature.view === view);
    return feature ? feature.isActive : false;
  };

  const getFavoriteStatus = (view: string) => {
    const feature = featureFavoriteStatus.find(
      (feature) => feature.view === view
    );
    return feature ? feature.isFavorite : false;
  };

  const renderView = () => {
    const isActive = !getFeatureStatus(activeView!); // Inverted logic
    const isFavorite = getFavoriteStatus(activeView!);
    const view = activeView as keyof ViewConfig;
    console.log(viewConfig[view].sliderCPSValues);

    switch (activeView) {
      case "AutoClicker":
        return (
          <Autoclicker
            isActive={isActive}
            toggleFeatureStatus={toggleFeatureStatus}
          />
        );
      case "FastPlace":
        return (
          <FastPlace
            isActive={isActive}
            toggleFeatureStatus={toggleFeatureStatus}
          />
        );
      case "AutoBlock":
        return (
          <AutoBlock
            isActive={isActive}
            toggleFeatureStatus={toggleFeatureStatus}
          />
        );
      default:
        return <div className="">Please select a feature to configure.</div>;
    }
  };

  useEffect(() => {
    renderView();
  }, [activeView, viewConfig]);

  if (loading) {
    return <Spinner text="Chargement..." />;
  }

  return (
    <>
      {showfavorite ? (
        <div className="flex flex-row w-full gap-20 h-fit">
          {featureFavoriteStatus
            .filter((feature) => feature.isFavorite)
            .slice(0, 4)
            .map((feature, index) => (
              <FeatureCard
                key={index}
                imageUrl={`/minecraft-item/${feature.view.toLowerCase()}.png`}
                titre={feature.view}
                onEditView={() =>
                  handleFeatureCardClick(feature.view as ViewNames)
                }
                selected={activeView === feature.view}
                isActive={getFeatureStatus(feature.view)}
                isFavorite={getFavoriteStatus(feature.view)}
                toggleActive={() =>
                  toggleFeatureStatus(feature.view as ViewNames)
                }
                toggleFavorite={() =>
                  toggleFavoriteStatus(feature.view as ViewNames)
                }
                showcase
              />
            ))}
          {Array.from({
            length:
              4 -
              featureFavoriteStatus.filter((feature) => feature.isFavorite)
                .length,
          }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="flex flex-col rounded-16 bg-blur border-2 p-25 items-center  cursor-pointer transition-all ease-in-out duration-200 flex-1 border-blur feature-card"
              onClick={() => handleFeatureCardClick("modules")}
            >
              <div className="flex flex-row justify-between w-full cursor-pointer h-[24px] gap-20"></div>
              <div className="flex flex-col w-full items-center">
                <div className="flex items-center justify-center w-[74px] h-[74px] border border-grey-400 text-grey-400 rounded-full transition-all ease-in-out duration-200 inner-circle">
                  <Add size={24} />
                </div>
                <p className="font-PPNeueBit text-36 text-grey-200">
                  Emplacement vide
                </p>
                <p className="text-20 text-grey-400">AJOUTER UN RACCOURCI</p>
              </div>
              <div className="h-[0px]"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row gap-20 h-full w-full overflow-hidden">
          <div className="w-[300px] flex flex-col gap-10 min-h-full overflow-hidden">
            <div className="flex flex-col gap-10 overflow-hidden no-scrollbar relative rounded-16">
              <div className="flex flex-col gap-10 overflow-scroll no-scrollbar">
                <FeatureCard
                  imageUrl="/minecraft-item/autoclicker.png"
                  titre="Auto Clicker"
                  touche="K"
                  onEditView={() =>
                    handleFeatureCardClickSetting("AutoClicker")
                  }
                  selected={activeView === "AutoClicker"}
                  isActive={getFeatureStatus("AutoClicker")}
                  isFavorite={getFavoriteStatus("AutoClicker")}
                  toggleActive={() => toggleFeatureStatus("AutoClicker")}
                  toggleFavorite={() => toggleFavoriteStatus("AutoClicker")}
                />
                <FeatureCard
                  imageUrl="/minecraft-item/fastplace.png"
                  titre="Fast Place"
                  touche="A"
                  onEditView={() => handleFeatureCardClickSetting("FastPlace")}
                  selected={activeView === "FastPlace"}
                  isActive={getFeatureStatus("FastPlace")}
                  isFavorite={getFavoriteStatus("FastPlace")}
                  toggleActive={() => toggleFeatureStatus("FastPlace")}
                  toggleFavorite={() => toggleFavoriteStatus("FastPlace")}
                />
                <FeatureCard
                  imageUrl="/minecraft-item/autoblock.png"
                  titre="Auto Block"
                  touche="X"
                  onEditView={() => handleFeatureCardClickSetting("AutoBlock")}
                  selected={activeView === "AutoBlock"}
                  isActive={getFeatureStatus("AutoBlock")}
                  isFavorite={getFavoriteStatus("AutoBlock")}
                  toggleActive={() => toggleFeatureStatus("AutoBlock")}
                  toggleFavorite={() => toggleFavoriteStatus("AutoBlock")}
                />
                <FeatureCard
                  imageUrl="/minecraft-item/randomFeature.png"
                  titre="Random Feature"
                  touche="K"
                  onEditView={() =>
                    handleFeatureCardClickSetting("RandomFeature")
                  }
                  selected={activeView === "RandomFeature"}
                  isActive={getFeatureStatus("RandomFeature")}
                  isFavorite={getFavoriteStatus("RandomFeature")}
                  toggleActive={() => toggleFeatureStatus("RandomFeature")}
                  toggleFavorite={() => toggleFavoriteStatus("RandomFeature")}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-16 ">
            <div className="flex-1 p-25 pb-0 flex flex-col gap-50 bg-blur rounded-t-16 h-full overflow-y-scroll scrollbar-hide rounded-16">
              {renderView()}
            </div>

            <div className="flex-1 flex flex-row gap-10 p-25 border-t border-grey-500 sticky bg-blur bottom-0 rounded-b-16">
              <div
                onClick={() => {
                  if (activeView) {
                    toggleFavoriteStatus(activeView as ViewNames);
                  }
                }}
                className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
              >
                <Star size={20} />
                <div className="font-bold tracking-wider">
                  AJOUTER AUX FAVORIS
                </div>
              </div>
              <Link
                href="#"
                className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
              >
                <SuggestFeature size={20} />
                <div className="font-bold tracking-wider">
                  SUGGÉRER UN AJOUT
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
