import React from "react";

const FromLabel = ({ title, subtitle }) => {
  return (
    <div className="mb-4">
      <p className="text-lg font-semibold mb-1">{title} </p>
      <p className="text-slate-500 font-normal">{subtitle}</p>
    </div>
  );
};

export default FromLabel;
