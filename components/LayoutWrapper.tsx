"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div>
      <Toaster position="top-right" />
      {children}
    </div>
  );
};

export default LayoutWrapper;
