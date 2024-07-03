import React from "react";

function SubmitButton({ theme }) {
  return (
    <button
      type="submit"
      className={
        theme === "light"
          ? "bg-black text-white font-bold py-2 px-4 rounded"
          : "bg-violet-950 text-white font-bold py-2 px-4 rounded"
      }
    >
      Update
    </button>
  );
}

export default SubmitButton;
