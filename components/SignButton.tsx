import React from "react";

type SignButtonTypes = {
  onClick: () => void;
  ariaLabel: string;
  label: string;
};

const SignButton = ({ onClick, ariaLabel, label }: SignButtonTypes) => {
  return (
    <button
      aria-label={ariaLabel}
      className="text-black bg-slate-200 hover:bg-white shadow-lg hover:shadow-black font-bold text-xl lg:text-3xl w-[90%] h-10 lg:h-16 lg:w-80 border-2 transition-all duration-300 uppercase rounded-full"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SignButton;
