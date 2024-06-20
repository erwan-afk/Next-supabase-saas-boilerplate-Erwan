import React, { useState } from "react";
import { FeatureCard } from "./FeatureCard";

interface FeatureStatus {
  view: string;
  isActive: boolean;
}

interface FeatureFavoriteStatus {
  view: string;
  isFavorite: boolean;
}

export const Modules: React.FC = () => {
  const [activeView, setActiveView] = useState<string | null>("AutoClicker");
  const [featureStatus, setFeatureStatus] = useState<FeatureStatus[]>([
    { view: "AutoClicker", isActive: true },
    { view: "FastPlace", isActive: true },
    { view: "AutoBlock", isActive: true },
    { view: "RandomFeature", isActive: true },
  ]);
  const [featureFavoriteStatus, setFeatureFavoriteStatus] = useState<
    FeatureFavoriteStatus[]
  >([
    { view: "AutoClicker", isFavorite: true },
    { view: "FastPlace", isFavorite: true },
    { view: "AutoBlock", isFavorite: true },
    { view: "RandomFeature", isFavorite: true },
  ]);

  const handleFeatureCardClick = (view: string) => {
    setActiveView(view);
  };

  const toggleFeatureStatus = (view: string) => {
    setFeatureStatus((prevStatus) =>
      prevStatus.map((feature) =>
        feature.view === view
          ? { ...feature, isActive: !feature.isActive }
          : feature
      )
    );
  };

  const toggleFavoriteStatus = (view: string) => {
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
    switch (activeView) {
      case "AutoClicker":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500 ">
              <div className="flex flex-row gap-25">
                <div className="flex">
                  <img src="/minecraft-item/diamond-sword.png" alt="" />
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
        );
      case "FastPlace":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500 ">
              <div className="flex flex-row gap-25">
                <div className="flex">
                  <img src="/minecraft-item/shield.png" alt="" />
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
        );
      case "AutoBlock":
        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center pb-25 border-b border-grey-500 ">
              <div className="flex flex-row gap-25">
                <div className="flex">
                  <img src="/minecraft-item/sandstone-block.png" alt="" />
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
        );
      default:
        return <div className="">Please select a feature to configure.</div>;
    }
  };

  return (
    <div className="flex flex-row gap-20 h-full w-full overflow-hidden">
      <div className="w-[300px] flex flex-col gap-10 min-h-full overflow-hidden">
        <div className="flex flex-col gap-10 overflow-hidden no-scrollbar relative">
          <div className="flex flex-col  gap-10 overflow-scroll no-scrollbar">
            <FeatureCard
              imageUrl="/minecraft-item/diamond-sword.png"
              titre="Auto Clicker"
              touche="K"
              onClick={() => handleFeatureCardClick("AutoClicker")}
              selected={activeView === "AutoClicker"}
              isActive={getFeatureStatus("AutoClicker")}
              isFavorite={getFavoriteStatus("AutoClicker")}
              toggleActive={() => toggleFeatureStatus("AutoClicker")}
              toggleFavorite={() => toggleFavoriteStatus("AutoClicker")}
            />
            <FeatureCard
              imageUrl="/minecraft-item/shield.png"
              titre="Fast Place"
              touche="A"
              onClick={() => handleFeatureCardClick("FastPlace")}
              selected={activeView === "FastPlace"}
              isActive={getFeatureStatus("FastPlace")}
              isFavorite={getFavoriteStatus("FastPlace")}
              toggleActive={() => toggleFeatureStatus("FastPlace")}
              toggleFavorite={() => toggleFavoriteStatus("FastPlace")}
            />
            <FeatureCard
              imageUrl="/minecraft-item/sandstone-block.png"
              titre="Auto Block"
              touche="X"
              onClick={() => handleFeatureCardClick("AutoBlock")}
              selected={activeView === "AutoBlock"}
              isActive={getFeatureStatus("AutoBlock")}
              isFavorite={getFavoriteStatus("AutoBlock")}
              toggleActive={() => toggleFeatureStatus("AutoBlock")}
              toggleFavorite={() => toggleFavoriteStatus("AutoBlock")}
            />
            <FeatureCard
              imageUrl="/minecraft-item/tnt-block.png"
              titre="Random Feature"
              touche="K"
              onClick={() => handleFeatureCardClick("RandomFeature")}
              selected={activeView === "RandomFeature"}
              isActive={getFeatureStatus("RandomFeature")}
              isFavorite={getFavoriteStatus("RandomFeature")}
              toggleActive={() => toggleFeatureStatus("RandomFeature")}
              toggleFavorite={() => toggleFavoriteStatus("RandomFeature")}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 p-50 bg-blur rounded-16">{renderView()}</div>
    </div>
  );
};
