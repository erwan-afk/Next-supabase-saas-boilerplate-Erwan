import React, { useRef, useContext } from "react";
import {
  useCheckboxGroupState,
  CheckboxGroupState,
} from "@react-stately/checkbox";
import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";

interface CheckboxGroupProps {
  children: React.ReactNode;

  value: string[]; // Prop value pour contenir les options sélectionnées
  onChange: (value: string[]) => void; // Fonction onChange pour mettre à jour les options sélectionnées
  isDisabled?: boolean;
}

interface CheckboxProps {
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
}

let CheckboxGroupContext = React.createContext<CheckboxGroupState | null>(null);

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children, value, onChange, ...rest } = props;
  const state = useCheckboxGroupState({ ...rest, value, onChange });
  const { groupProps, labelProps } = useCheckboxGroup(rest, state);

  return (
    <div className="flex flex-col gap-10" {...groupProps}>
      <CheckboxGroupContext.Provider value={state}>
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  );
}

export function Checkbox(props: CheckboxProps) {
  const { children, ...rest } = props;
  const state = useContext(CheckboxGroupContext)!;
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckboxGroupItem(rest, state, ref);

  const isDisabled = state.isDisabled || props.isDisabled;
  const isSelected = state.isSelected(rest.value);

  return (
    <div className="flex flex-row gap-10 items-center">
      <input
        {...inputProps}
        type="checkbox"
        ref={ref}
        className="h-[20px] w-[20px] p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-blue-500"
      />
      <label className="flex items-center ">
        <span className="text-20 leading-5 text-grey-300">{children}</span>
      </label>
    </div>
  );
}
