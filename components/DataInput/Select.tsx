import React from "react";

type SelectTypes = {
  label: string;
  name: string;
  options: {
    name: string;
    value: string | number;
  }[];
  invisible: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, name, onChange, options, invisible }: SelectTypes) => {
  return (
    <div
      key={name}
      className={`form-control w-full ${invisible ? "hidden" : "flex"}`}
    >
      <label className="label cursor-pointer flex items-start flex-col ">
        <span className="label-text text-primary-content">{label}</span>
        <select
          name={name}
          aria-label={`select ${name}`}
          onChange={onChange}
          className="select select-bordered w-full bg-neutral-focus"
        >
          {options.map(({ name, value }) => (
            <option key={name} aria-label={`option ${name}`} value={value}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
