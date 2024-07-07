import React from "react";

type TextAreaProps = {
  labelText: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  errors: string;
  name: string;
  placeholder: string;
  maxLength: number;
  theme: "light" | "dark";
};

const TextArea: React.FC<TextAreaProps> = ({
  labelText,
  id,
  onChange,
  value,
  errors,
  name,
  placeholder,
  maxLength,
  theme
}) => {
    const textColor = theme === "light" ? "text-black" : "text-white";
    const bgColor = theme === "light" ? "bg-white" : "bg-gray-800";
    const borderColor = theme === "light" ? "border-gray-200" : "border-gray-600";
    console.log("theme ", theme);
    
  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-${textColor}`}
      >
        {labelText}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full h-32 p-2 border border-${borderColor} rounded-lg ${bgColor} resize-none`}
        placeholder={placeholder}
      ></textarea>
      <p
        className={
          value.length > maxLength
            ? `text-red-500 mt-2`
            :`text-black-500 mt-2 text-${textColor}`
        }
      >
        {value.length}/{maxLength}
      </p>
      {errors && <p className="text-red-500 mt-2">{errors}</p>}
    </div>
  );
};

export default TextArea;
