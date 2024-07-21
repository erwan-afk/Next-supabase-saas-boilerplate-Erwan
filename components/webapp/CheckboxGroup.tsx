import React, { useRef, useContext } from "react";
import {
  useCheckboxGroupState,
  CheckboxGroupState,
} from "@react-stately/checkbox";
import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";

let CheckboxGroupContext = React.createContext<CheckboxGroupState | null>(null);

interface CheckboxGroupProps {
  children: React.ReactNode;
  value: string[];
  onChange: (value: string[]) => void;
  isDisabled?: boolean;
  ariaLabel: string; // Rendre ariaLabel obligatoire
  line?: boolean;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children, value, onChange, isDisabled, ariaLabel, line } = props;
  const state = useCheckboxGroupState({ value, onChange, isDisabled });
  const { groupProps } = useCheckboxGroup({ "aria-label": ariaLabel }, state);

  return (
    <div
      className={`flex gap-10 ${line ? "flex-row gap-25" : "flex-col"}`}
      {...groupProps}
    >
      <CheckboxGroupContext.Provider value={state}>
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  );
}

interface CheckboxProps {
  children?: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  ariaLabel: string;
  imageSrc?: string; // Ajout de l'imageSrc comme prop
}

export function Checkbox(props: CheckboxProps) {
  const { children, ariaLabel, value, isDisabled, imageSrc } = props;
  const state = useContext(CheckboxGroupContext)!;
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckboxGroupItem(
    { value, isDisabled, "aria-label": ariaLabel },
    state,
    ref
  );

  return (
    <div className="flex flex-row gap-10 items-center">
      <input
        {...inputProps}
        type="checkbox"
        ref={ref}
        className="cacher" // Cache l'input natif
      />
      {imageSrc ? (
        <div
          onClick={() => !isDisabled && ref.current?.click()}
          className={`p-3 flex items-center justify-center rounded-full cursor-pointer transition-colors
            ${state.isSelected(value) ? "bg-goldyellow" : "bg-blur"}
            ${isDisabled ? "cursor-not-allowed opacity-50" : ""}
          `}
        >
          <img
            src={imageSrc}
            alt="checkbox icon"
            className="h-[32px] w-[32px] "
          />
        </div>
      ) : (
        <input
          {...inputProps}
          type="checkbox"
          ref={ref}
          className="h-[20px] w-[20px] p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-blue-500"
        />
      )}
      {children && (
        <label className="flex items-center">
          <span className="text-20 leading-5 text-grey-300">{children}</span>
        </label>
      )}
    </div>
  );
}
