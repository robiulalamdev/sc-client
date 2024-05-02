import React from "react";
import BrandkitTable from "./BrandkitTable";

const BrandKit = ({ selectedProject }) => {
  // console.log("selected project: ", selectedProject?.brandKit);
  return (
    <div className="flex flex-col gap-8">
      <BrandkitTable
        fileName="PDF Document"
        name="Brand Guidelines"
        items={selectedProject?.brandKit?.brandGuidelines}
      />
      <BrandkitTable
        fileName="Logo File"
        name="Logos"
        items={selectedProject?.brandKit?.logos}
      />
      <BrandkitTable
        fileName="Font File"
        name="Fonts"
        items={selectedProject?.brandKit?.fonts}
      />
      <BrandkitTable
        fileName="Color File"
        name="Color Palette"
        items={selectedProject?.brandKit?.colorPalette}
      />
      <BrandkitTable
        fileName="image file"
        name="Image Assets"
        items={selectedProject?.brandKit?.imageAssets}
      />
      <BrandkitTable
        fileName="video file"
        name="Video Assets"
        items={selectedProject?.brandKit?.videoAssets}
      />
      <BrandkitTable
        fileName="audio file"
        name="Audio Assets"
        items={selectedProject?.brandKit?.audioAssets}
      />
    </div>
  );
};

export default BrandKit;
