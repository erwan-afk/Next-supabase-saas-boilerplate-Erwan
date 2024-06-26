import { useState, useEffect } from "react";

export interface ViewConfig {
  AutoClicker: FeatureConfig;
  FastPlace: FeatureConfig;
  AutoBlock: FeatureConfig;
  RandomFeature: FeatureConfig;
  // Add other views if necessary
}

interface FeatureConfig {
  options: string[];
  selectedOption: string;
  selected: string[];
  sliderCPSValues: [number, number];
  sliderTBMValues: number;
  // Add other properties if necessary
}

const initialViewConfig: ViewConfig = {
  AutoClicker: {
    options: ["JITTER", "BUTTERFLY", "BLATANT"],
    selectedOption: "BLATANT",
    selected: ["weapons"],
    sliderCPSValues: [11, 17],
    sliderTBMValues: 3,
  },
  FastPlace: {
    options: ["NATUREL", "BLATANT"],
    selectedOption: "BLATANT",
    selected: ["handblock", "scopeblock"],
    sliderCPSValues: [16, 21],
    sliderTBMValues: 0,
  },
  AutoBlock: {
    options: ["MANUEL", "AUTOMATIQUE"],
    selectedOption: "AUTOMATIQUE",
    selected: [],
    sliderCPSValues: [140, 400],
    sliderTBMValues: 370,
  },
  RandomFeature: {
    options: ["MANUEL", "AUTOMATIQUE"],
    selectedOption: "AUTOMATIQUE",
    selected: [],
    sliderCPSValues: [140, 140],
    sliderTBMValues: 370,
  },
};

export const useViewConfig = () => {
  const [viewConfig, setViewConfig] = useState<ViewConfig>(() => {
    const savedConfig = localStorage.getItem("viewConfig");
    return savedConfig ? JSON.parse(savedConfig) : initialViewConfig;
  });

  const updateViewConfig = (
    view: keyof ViewConfig,
    config: Partial<ViewConfig[typeof view]>
  ) => {
    setViewConfig((prevConfig) => ({
      ...prevConfig,
      [view]: {
        ...prevConfig[view],
        ...config,
      },
    }));
  };

  return { viewConfig, updateViewConfig };
};
