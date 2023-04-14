import React from "react";

type CheckboxTypes = {
  label: string;
  name: string;
  disabledLabel: string;
  checked: boolean;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  label,
  checked,
  name,
  disabled,
  onChange,
  disabledLabel,
}: CheckboxTypes) => {
  return (
    <div className="p-2">
      <label className="label cursor-pointer">
        <span className="label-text text-white">{label}</span>
        <input
          type="checkbox"
          checked={checked}
          aria-label={`checkbox ${name}`}
          disabled={disabled}
          name={name}
          className="checkbox checkbox-accent"
          onChange={onChange}
        />
      </label>
      {disabled && (
        <span className="text-xs text-slate-400">{disabledLabel}</span>
      )}
    </div>
  );
};

export default Checkbox;
