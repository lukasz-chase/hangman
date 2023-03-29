"use client";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonTypes = {
  children: ReactNode;
  link: string;
};

const Button = ({ children, link }: ButtonTypes) => {
  return (
    <Link
      className="p-2 md:p-5 text-sm md:text-xl uppercase border-2  bg-white text-black rounded-md shadow-md transition-all duration-100 ease-in-out border-white hover:border-lime-500"
      href={link}
    >
      {children}
    </Link>
  );
};

export default Button;
