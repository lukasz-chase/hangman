import React from "react";

type InputTypes = {
  value: string;
  placeholder: string;
  maxLength?: number;
  ariaLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toolTip?: string;
};

const Input = ({
  value,
  placeholder,
  maxLength,
  onChange,
  toolTip,
  ariaLabel,
}: InputTypes) => {
  return (
    <div className="form-control w-full mt-2">
      <div className="flexCenter">
        <input
          type="text"
          aria-label={ariaLabel}
          placeholder={placeholder}
          maxLength={maxLength}
          className="input input-bordered w-full"
          value={value}
          onChange={onChange}
        />
        {toolTip && (
          <div
            className="md:tooltip md:tooltip-bottom hover:tooltip-open cursor-pointer"
            data-tip={toolTip}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
