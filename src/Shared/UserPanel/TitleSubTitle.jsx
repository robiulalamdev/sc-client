import React from "react";

const TitleSubTitle = ({ title, subtitle }) => {
  return (
    <div>
      <p className="text-xl font-bold mb-2">{title}</p>
      <p className="text-slate-500 font-normal text-sm mb-6">{subtitle}</p>
    </div>
  );
};

export default TitleSubTitle;
