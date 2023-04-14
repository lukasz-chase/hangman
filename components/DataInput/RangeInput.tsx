import React from "react";

type RangeInputTypes = {
  label: string;
  name: string;
  min: number;
  max: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string;
  options: number[];
};

const RangeInput = ({
  value,
  name,
  label,
  onChange,
  min,
  max,
  options,
}: RangeInputTypes) => {
  return (
    <div className="p-2">
      <h2>{label}</h2>
      <input
        type="range"
        aria-label={`input ${name}`}
        min={min}
        max={max}
        name={name}
        value={value}
        className="range range-accent"
        step="1"
        onChange={onChange}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {options.map((number) => (
          <span key={number}>{number}</span>
        ))}
      </div>
    </div>
  );
};

export default RangeInput;
