import React from "react";
import { Input } from "../ui/input";

interface FormInputProps {
  placeholder: string;
  variant?: "default" | "password";
}

function FormInput({ placeholder, variant, ...otherProps }: FormInputProps) {
  return (
    <Input
      variant={variant ?? "default"}
      placeholder={placeholder}
      {...otherProps}
      className="!focus:border-blue-400 !focus:ring-blue-400 h-8 border-gray-200"
    />
  );
}

export default FormInput;
