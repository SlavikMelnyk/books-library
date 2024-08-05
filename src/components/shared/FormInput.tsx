import React, { FC } from "react";

interface FormInputProps {
  name: string;
  register: any;
  defaultValue?: string;
}

const FormInput: FC<FormInputProps> = ({ register, name, ...rest }) => {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      {...register(name)}
      {...rest}
    />
  );
};

export default FormInput;
