"use client";
import Link from "next/link";
import React from "react";

type CustomLinkProps = {
  link: string;
  label: string;
};

const CustomLink = ({ link, label }: CustomLinkProps) => {
  return (
    <Link
      className="btn btn-accent text-sm md:text-xl uppercase shadow-md text-center"
      href={link}
    >
      {label}
    </Link>
  );
};

export default CustomLink;
