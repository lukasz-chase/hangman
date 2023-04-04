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
      className="btn btn-accent text-sm md:text-xl uppercase shadow-md text-center"
      href={link}
    >
      {children}
    </Link>
  );
};

export default Button;
