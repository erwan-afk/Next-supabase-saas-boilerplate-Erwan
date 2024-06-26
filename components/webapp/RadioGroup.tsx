import React from "react";
import { Radio, RadioGroup } from "react-aria-components";

interface ShippingOptionProps {
  name: string;
}

interface MyRadioGroupProps {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export function MyRadioGroup({
  options,
  selectedValue,
  onChange,
}: MyRadioGroupProps) {
  // Vérifier si options est défini et est un tableau
  if (!options || !Array.isArray(options)) {
    return null; // ou retourner un message d'erreur ou un composant de fallback
  }

  return (
    <div className="flex flex-col ">
      <RadioGroup
        className="flex flex-row gap-2 w-full max-w-[300px] "
        value={selectedValue}
        onChange={onChange}
      >
        {options.map((option) => (
          <ShippingOption key={option} name={option} />
        ))}
      </RadioGroup>
    </div>
  );
}

// ... Le reste du code pour ShippingOption reste inchangé

export function ShippingOption({ name }: ShippingOptionProps) {
  return (
    <Radio
      value={name}
      className={({ isSelected, isHovered }) => `
        group relative flex  cursor-pointer h-[40px] px-[20px] rounded-16 text-20 font-bold  
        ${
          isSelected ? "bg-goldyellow  text-grey-600 drop-shadow-glowlight" : ""
        }
        ${isHovered && !isSelected ? "text-goldyellow bg-goldyellowhover " : ""}
        ${!isSelected && !isHovered ? "bg-blur text-grey-200" : ""}
      `}
    >
      <div className="flex w-full items-center justify-between ">{name}</div>
    </Radio>
  );
}
