import React from "react";

type InputProps = {
  theme: "light" | "dark";
  value?: any ;
  type: "file" | "email" | "password" | "text" | "number";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  id: string;
  errors?: string | undefined;
  step?: number
};

const Input: React.FC<InputProps> = ({
  theme,
  value,
  type,
  placeholder,
  onChange,
  labelText,
  id,
  errors,
  step,
}) => {
  return (
    <div className="mb-4">
      <label
        className={
          theme === "light"
            ? "block text-gray-700 font-bold mb-2"
            : "block text-gray-300 font-bold mb-2"
        }
        htmlFor={id}
      >
        {labelText}
      </label>
      <input
        name={id}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        step={step}
        className={
          theme === "light"
            ? "w-full p-2 border border-gray-300 rounded"
            : "w-full p-2 border bg-gray-700 border-gray-600 rounded"
        }
        
        placeholder={placeholder}
      />
      {errors && <p className="text-red-500 mt-2">{errors}</p>}
    </div>
  );
};

export default Input;
