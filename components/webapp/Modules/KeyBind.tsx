import React, { useState, useEffect } from "react";

interface KeyAssociationProps {
  keyBind: string;
  onChange: (key: string) => void;
  red?: boolean; // Optionnel, si true, utilise des couleurs spécifiques
  module: string;
}

const KeyAssociation: React.FC<KeyAssociationProps> = ({
  keyBind,
  onChange,
  red,
  module,
}) => {
  const [key, setKey] = useState(keyBind);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    setKey(keyBind);
  }, [keyBind]);

  const handleClick = () => {
    setIsSetting(true);
    setKey("?");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isSetting) {
      const keyName = getKeyName(event);
      setKey(keyName);
      setIsSetting(false);
      onChange(keyName);
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (isSetting) {
      const mouseButton = getMouseButton(event);
      setKey(mouseButton);
      setIsSetting(false);
      onChange(mouseButton);
    }
  };

  const getKeyName = (event: KeyboardEvent): string => {
    if (event.key === " ") return "Space";
    if (event.key.length === 1) return event.key.toUpperCase();
    return event.key.charAt(0).toUpperCase() + event.key.slice(1);
  };

  const getMouseButton = (event: MouseEvent): string => {
    switch (event.button) {
      case 0:
        return "M1";
      case 1:
        return "M3";
      case 2:
        return "M2";
      case 3:
        return "M4";
      case 4:
        return "M5";
      default:
        return `M${event.button + 1}`;
    }
  };

  useEffect(() => {
    if (isSetting) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleMouseDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isSetting]);

  // Définir les classes en fonction de la prop `red`
  const containerClasses = `bg-blur rounded-16 cursor-pointer flex flex-row justify-end p-25 items-center h-fit ${
    isSetting
      ? "hover:bg-blur"
      : red
      ? "hover:bg-[#FF505010]"
      : "hover:bg-[#ffbb0010]"
  }`;

  const keyBoxClasses = `w-fit min-w-[64px] px-4 h-[64px] rounded-8 border-2 ${
    red
      ? "border-voltred text-voltred drop-shadow-glowred"
      : "border-goldyellow text-goldyellow drop-shadow-glowlight"
  } bg-touche bg-cover  flex items-center justify-center font-bold text-24 ${
    isSetting ? "border-grey-200 text-grey-200" : ""
  }`;

  return (
    <div onClick={handleClick} className={containerClasses}>
      <div>
        <p className="text-20 text-grey-100 font-bold">
          TOUCHE ASSOCIÉE : {key}
        </p>
        <p className="text-16 text-grey-300">
          Clique-ici pour changer la touche associée au module{" "}
          <span className="font-bold text-grey-200">{module}.</span>
        </p>
      </div>
      <div>
        <div className={keyBoxClasses}>{key}</div>
      </div>
    </div>
  );
};

export default KeyAssociation;
