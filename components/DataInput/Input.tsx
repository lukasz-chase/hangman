import React from "react";

type InputTypes = {
  value: string;
  placeholder: string;
  maxLength?: number;
  ariaLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const Input = ({
  value,
  placeholder,
  maxLength,
  onChange,
  ariaLabel,
  label,
}: InputTypes) => {
  return (
    <div className="form-control w-full mt-2">
      <label className="label">
        <span className="label-text text-[#A6ADBB]">{label}</span>
      </label>
      <input
        type="text text-primary-content"
        aria-label={ariaLabel}
        placeholder={placeholder}
        maxLength={maxLength}
        className="input input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
