import React from "react";

type SubmitButtonProps = {
    name: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ name }) => {
  return (
    <button
      type="submit"
      className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-200"
    >
      {name}
    </button>
  );
};

export default SubmitButton;
