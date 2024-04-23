import { Plus } from "@phosphor-icons/react";
import React from "react";

const PlusButton = ({ handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="border border-dashed rounded-xl flex items-center justify-center min-h-32"
    >
      <Plus className="text-indigo-600" size={24} weight="bold" />
    </div>
  );
};

export default PlusButton;
