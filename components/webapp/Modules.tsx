import React, { useState, useEffect } from "react";
import { FeatureCard } from "./FeatureCard";
import { UserIcon } from "lucide-react";
import { UserProfile } from "../icons/icons";

import { MySlider } from "./Slider";
import { MyRadioGroup } from "./RadioGroup";
import { Checkbox, CheckboxGroup } from "./CheckboxGroup";
import { useViewConfig, ViewConfig } from "./Configuration";

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
      setView(view); // Appeler setView pour mettre à jour la vue dans SubscriptionPage
    }
  };

  const handleFeatureCardClickSetting = <T extends keyof ViewConfig>(
    view: T
  ) => {
    setActiveView(view); // Appeler setView pour mettre à jour la vue dans SubscriptionPage
  };

  const loadFeatureStatusFromLocalStorage = () => {
    const storedStatus = localStorage.getItem("featureStatus");
    return storedStatus ? JSON.parse(storedStatus) : null;
  };

  // Fonction pour sauvegarder les états dans le localStorage
  const saveFeatureStatusToLocalStorage = (data: FeatureStatus[]): void => {
    localStorage.setItem("featureStatus", JSON.stringify(data));
  };

  // Fonction pour charger les favoris depuis le localStorage
  const loadFeatureFavoriteStatusFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem("featureFavoriteStatus");
    return storedFavorites ? JSON.parse(storedFavorites) : null;
  };

  // Fonction pour sauvegarder les favoris dans le localStorage
  const saveFeatureFavoriteStatusToLocalStorage = (
    data: FeatureFavoriteStatus[]
  ): void => {
    localStorage.setItem("featureFavoriteStatus", JSON.stringify(data));
  };

  const initialFeatures: ViewNames[] = [
    "AutoClicker",
    "FastPlace",
    "AutoBlock",
    "RandomFeature",
  ];

  const [featureStatus, setFeatureStatus] = useState<FeatureStatus[]>(() => {
    const storedStatus = loadFeatureStatusFromLocalStorage();
    return storedStatus
      ? storedStatus
      : initialFeatures.map((feature) => ({ view: feature, isActive: true }));
  });

  const [featureFavoriteStatus, setFeatureFavoriteStatus] = useState<
    FeatureFavoriteStatus[]
  >(() => {
    const storedFavorites = loadFeatureFavoriteStatusFromLocalStorage();
    return storedFavorites
      ? storedFavorites
      : initialFeatures.map((feature) => ({ view: feature, isFavorite: true }));
  });

  // Utilisation des fonctions de sauvegarde lorsque les états changent
  useEffect(() => {
    saveFeatureStatusToLocalStorage(featureStatus);
  }, [featureStatus]);

  useEffect(() => {
    saveFeatureFavoriteStatusToLocalStorage(featureFavoriteStatus);
  }, [featureFavoriteStatus]);

  const toggleFeatureStatus = (view: ViewNames) => {
    setFeatureStatus((prevStatus) =>
      prevStatus.map((feature) =>
        feature.view === view
          ? { ...feature, isActive: !feature.isActive }
          : feature
      )
    );
  };

  const toggleFavoriteStatus = (view: ViewNames) => {
    setFeatureFavoriteStatus((prevStatus) =>
      prevStatus.map((feature) =>
        feature.view === view
          ? { ...feature, isFavorite: !feature.isFavorite }
          : feature
      )
    );
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
    const isActive = getFeatureStatus(activeView!);
    const isFavorite = getFavoriteStatus(activeView!);
    const view = activeView as keyof ViewConfig;
    console.log(viewConfig[view].sliderCPSValues);

    switch (activeView) {
      case "AutoClicker":
        return (
          <>
            <div className="flex flex-col gap-50">
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
                      checked={isActive}
                    />
                    <div className="knobs">
                      <span></span>
                    </div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
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
                <div className=" bg-blur rounded-16 flex flex-row justify-end p-25 items-center h-fit ">
                  <div>
                    <p className="text-20 text-grey-100 font-bold">
                      TOUCHE ASSOCIÉE : K
                    </p>
                    <p className="text-16 text-grey-300">
                      Clique-ici pour changer la touche associée au module{" "}
                      <span className="font-bold text-grey-200">
                        Auto Clicker.
                      </span>
                    </p>
                  </div>
                  <div>
                    <div className="w-[64px] h-[64px] rounded-8 border-2 text-goldyellow border-goldyellow bg-touche bg-cover drop-shadow-glowlight flex items-center justify-center font-bold text-24">
                      K
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex-1 pr-50 flex items-center">
                <MyRadioGroup
                  options={viewConfig[view].options}
                  selectedValue={viewConfig[view].selectedOption}
                  onChange={handleRadioChange(activeView)}
                />
              </div>
              <div className="flex-1 flex items-center">
                <MySlider
                  key={1}
                  min={10}
                  max={25}
                  unite="CPS"
                  onChange={(value) => {
                    console.log(`New slider value for ${activeView}: `, value);
                    handleSliderChange(activeView, "sliderCPSValues")(value);
                  }}
                  defaultValue={viewConfig[view].sliderCPSValues}
                  thumbLabels={["start", "end"]}
                />
              </div>
            </div>
            <div className="flex flex-row pt-50">
              <div className="flex-1 pr-50 flex items-center">
                <CheckboxGroup
                  value={viewConfig[view].selected}
                  onChange={handleCheckboxChange(activeView)}
                >
                  <Checkbox value="autoclickermenu">
                    Activer l'autoclicker dans les menus
                  </Checkbox>
                  <Checkbox value="weapons">Uniquement sur les armes</Checkbox>
                  <Checkbox value="blocks">Pouvoir casser les blocs</Checkbox>
                  <Checkbox value="hit">Activer la hit sélection</Checkbox>
                </CheckboxGroup>
              </div>
              <div className="flex-1 flex flex-col gap-20">
                <h1 className="text-grey-200 font-bold text-20">
                  TREMBLEMENT :<span className="text-grey-400"> MOYEN</span>
                </h1>
                <MySlider
                  key={2}
                  min={0}
                  max={5}
                  unite="CPS"
                  onChange={handleSliderChange(activeView, "sliderTBMValues")}
                  defaultValue={viewConfig[view].sliderTBMValues}
                  thumbLabels={["start,end"]}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-row gap-10 pt-25 border-t border-grey-500 ">
              <div
                onClick={() => toggleFavoriteStatus("AutoClicker")}
                className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
              >
                <UserProfile size={20} />
                <div className="font-bold tracking-wider ">
                  AJOUTER AUX FAVORIS
                </div>
              </div>
              <div className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                <UserProfile size={20} />
                <div className="font-bold tracking-wider ">
                  SUGGÉRER UN AJOUT
                </div>
              </div>
            </div>
          </>
        );
      case "FastPlace":
        return (
          <>
            <div className="flex flex-col gap-10">
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
                      checked={isActive}
                    />
                    <div className="knobs">
                      <span></span>
                    </div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
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
                <div className=" bg-blur rounded-16 flex flex-row justify-end p-25 items-center h-fit ">
                  <div>
                    <p className="text-20 text-grey-100 font-bold">
                      TOUCHE ASSOCIÉE : A
                    </p>
                    <p className="text-16 text-grey-300">
                      Clique-ici pour changer la touche associée au module{" "}
                      <span className="font-bold text-grey-200">
                        FastPlace.
                      </span>
                    </p>
                  </div>
                  <div>
                    <div className="w-[64px] h-[64px] rounded-8 border-2 text-goldyellow border-goldyellow bg-touche bg-cover drop-shadow-glowlight flex items-center justify-center font-bold text-24">
                      A
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex-1 pr-50 flex items-center">
                <MyRadioGroup
                  options={viewConfig[view].options}
                  selectedValue={viewConfig[view].selectedOption}
                  onChange={handleRadioChange(activeView)}
                />
              </div>
              <div className="flex-1 flex items-center">
                <MySlider
                  key={3}
                  min={10}
                  max={500}
                  unite="CPS"
                  onChange={handleSliderChange(activeView, "sliderCPSValues")}
                  defaultValue={viewConfig[view].sliderCPSValues}
                  thumbLabels={["start", "end"]}
                />
              </div>
            </div>
            <div className="flex flex-row pt-50">
              <div className="flex-1 pr-50 flex items-center">
                <CheckboxGroup
                  value={viewConfig[view].selected}
                  onChange={handleCheckboxChange(activeView)}
                >
                  <Checkbox value="handblock">
                    Fonctionner seulement avec des blocs dans la main
                  </Checkbox>
                  <Checkbox value="scopeblock">
                    Activer uniquement quand on vise un bloc
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div className="flex-1 flex flex-col gap-20">
                <h1 className="text-grey-200 font-bold text-20">
                  TREMBLEMENT :<span className="text-grey-400"> MOYEN</span>
                </h1>
                <MySlider
                  key={4}
                  min={0}
                  max={5}
                  unite="CPS"
                  onChange={handleSliderChange(activeView, "sliderTBMValues")}
                  defaultValue={viewConfig[view].sliderTBMValues}
                  thumbLabels={["start,end"]}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-row gap-10 pt-25 border-t border-grey-500 ">
              <div
                onClick={() => toggleFavoriteStatus("AutoClicker")}
                className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
              >
                <UserProfile size={20} />
                <div className="font-bold tracking-wider ">
                  AJOUTER AUX FAVORIS
                </div>
              </div>
              <div className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                <UserProfile size={20} />
                <div className="font-bold tracking-wider ">
                  SUGGÉRER UN AJOUT
                </div>
              </div>
            </div>
          </>
        );
      case "AutoBlock":
        return (
          <>
            <div className="flex flex-col gap-10">
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
                      checked={isActive}
                    />
                    <div className="knobs">
                      <span></span>
                    </div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex-1 pr-50">
                <p className="text-20 text-grey-300">
                  Ce module permet de{" "}
                  <span className="font-bold text-grey-100">
                    parer les coups facilement à votre place.{" "}
                  </span>
                  C’est utile pour diviser les dégats en jeu et faire du
                  Hit&Block.
                </p>
              </div>
              <div className="flex-1 ">
                <div className=" bg-blur rounded-16 flex flex-row justify-end p-25 items-center h-fit ">
                  <div>
                    <p className="text-20 text-grey-100 font-bold">
                      TOUCHE ASSOCIÉE : X
                    </p>
                    <p className="text-16 text-grey-300">
                      Clique-ici pour changer la touche associée au module{" "}
                      <span className="font-bold text-grey-200">
                        Auto Clicker.
                      </span>
                    </p>
                  </div>
                  <div>
                    <div className="w-[64px] h-[64px] rounded-8 border-2 text-goldyellow border-goldyellow bg-touche bg-cover drop-shadow-glowlight flex items-center justify-center font-bold text-24">
                      X
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex-1 pr-50 flex items-center">
                <MyRadioGroup
                  options={viewConfig[view].options}
                  selectedValue={viewConfig[view].selectedOption}
                  onChange={handleRadioChange(activeView)}
                />
              </div>
              <div className="flex-1 flex flex-col gap-20">
                <h1 className="text-grey-200 font-bold text-20">
                  DURÉE MAXIMALE :
                </h1>
                <MySlider
                  key={5}
                  min={10}
                  max={25}
                  unite="CPS"
                  onChange={handleSliderChange(activeView, "sliderCPSValues")}
                  defaultValue={viewConfig[view].sliderCPSValues}
                  thumbLabels={["start", "end"]}
                />
              </div>
            </div>
            <div className="flex flex-row pt-50">
              <div className="flex-1 pr-50 flex items-center"></div>
              <div className="flex-1 flex flex-col gap-20">
                <h1 className="text-grey-200 font-bold text-20">COOLDOWN</h1>
                <MySlider
                  key={6}
                  min={0}
                  max={5}
                  unite="CPS"
                  onChange={handleSliderChange(activeView, "sliderTBMValues")}
                  defaultValue={viewConfig[view].sliderTBMValues}
                  thumbLabels={["start,end"]}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-row gap-10 pt-25 border-t border-grey-500 ">
              <div
                onClick={() => toggleFavoriteStatus("AutoClicker")}
                className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200"
              >
                <UserProfile size={20} />
                <div className="font-bold tracking-wider ">
                  AJOUTER AUX FAVORIS
                </div>
              </div>
              <div className="w-full h-50 cursor-pointer rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200">
                <UserProfile size={20} />
                <div className="font-bold tracking-wider ">
                  SUGGÉRER UN AJOUT
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <div className="">Please select a feature to configure.</div>;
    }
  };

  useEffect(() => {
    renderView();
  }, [activeView, viewConfig]); // Update renderView when activeView or viewConfig changes

  return (
    <>
      {showfavorite ? (
        <div className="flex flex-row w-full gap-20">
          {featureFavoriteStatus
            .filter((feature) => feature.isFavorite)
            .slice(0, 4) // Affiche uniquement les 4 premiers favoris
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
              className="flex flex-col rounded-16 bg-blur border-2 p-25 items-center justify-between cursor-pointer transition-all ease-in-out duration-200 flex-1 border-blur feature-card"
              onClick={() => handleFeatureCardClick("modules")}
            >
              <div className="flex flex-row justify-between w-full cursor-pointer h-[34px] gap-20"></div>
              <div className="flex flex-col w-full items-center">
                <div className="flex items-center justify-center w-[74px] h-[74px] border border-grey-400 text-grey-400 rounded-full transition-all ease-in-out duration-200 inner-circle">
                  <UserProfile size={24} />
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
            <div className="flex flex-col gap-10 overflow-hidden no-scrollbar relative">
              <div className="flex flex-col  gap-10 overflow-scroll no-scrollbar">
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
          <div className="flex-1 p-50 flex flex-col gap-50 bg-blur rounded-16">
            {renderView()}
          </div>
        </div>
      )}
    </>
  );
};
