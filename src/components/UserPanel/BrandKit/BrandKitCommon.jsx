import React from "react";

const BrandKitCommon = ({
  title,
  subtitle,
  kitRef,
  handleChange,
  kitName,
  acceptType,
}) => {
  return (
    <div>
      <p className="text-xl font-bold mb-2">{title}</p>
      <p className="text-slate-500 font-normal text-sm mb-6">{subtitle}</p>
      <input
        ref={kitRef}
        type="file"
        name={kitName}
        className="hidden"
        onChange={handleChange}
        accept={acceptType}
      />
    </div>
  );
};

export default BrandKitCommon;
