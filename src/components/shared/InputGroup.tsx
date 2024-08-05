import React, { FC, ReactNode } from "react";

interface InputGroupProps {
  children: ReactNode;
  label: string;
  error?: string;
}

const InputGroup: FC<InputGroupProps> = ({ label, children, error }) => {
  return (
    <div className="">
      <span className="">{label}</span>
      {children}
      <div className="text-red-500">{error}</div>
    </div>
  );
};

export default InputGroup;
