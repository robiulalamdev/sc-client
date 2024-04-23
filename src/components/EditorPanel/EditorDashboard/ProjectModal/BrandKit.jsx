import React from "react";
import BrandkitTable from "./BrandkitTable";

const BrandKit = ({ selectedProject }) => {
  return (
    <div className="flex flex-col gap-8">
      <BrandkitTable />
      <BrandkitTable />
      <BrandkitTable />
    </div>
  );
};

export default BrandKit;
