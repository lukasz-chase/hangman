import React from "react";

type SelectTypes = {
  label: string;
  name: string;
  options: {
    name: string;
    value: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, name, onChange, options }: SelectTypes) => {
  return (
    <div key={name} className="form-control w-full ">
      <label className="label cursor-pointer flexCenter flex-col text-primary-content">
        <span className="label-text">{label}</span>
        <select
          name={name}
          aria-label={`select ${name}`}
          onChange={onChange}
          className="select select-bordered w-full"
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
