import React, { useState } from "react";
import { useSelector } from "react-redux";
import SelectBrand from "../SelectBrand";
import ProjectBrandInfo from "./ProjectBrandInfo";
import ExpandInputTitle from "../ExpandInputTitle";
import { useMyBrandKitsQuery } from "../../../../features/brand-kit/brandKitApi";

const ProjectBrandKit = ({ save, isLoading, projectData }) => {
  const { data, isLoading: isBrandLoading } = useMyBrandKitsQuery(null);
  const { activeBrif } = useSelector((state) => state.project);
  const [editing, setEditing] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  return activeBrif === "brandKit" ? (
    <SelectBrand
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      setEditing={setEditing}
      setSelectedBrand={setSelectedBrand}
      selectedBrand={selectedBrand}
      data={data?.data}
      isBrandLoading={isBrandLoading}
    />
  ) : editing ? (
    <SelectBrand
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      editing={editing}
      setEditing={setEditing}
      setSelectedBrand={setSelectedBrand}
      selectedBrand={selectedBrand}
      data={data?.data}
      isBrandLoading={isBrandLoading}
    />
  ) : projectData?.brandKit ? (
    <ProjectBrandInfo
      brandKit={projectData?.brandKit}
      setEditing={setEditing}
      brandName={selectedBrand?.brandName}
      logo={selectedBrand?.brandLogo}
    />
  ) : (
    <ExpandInputTitle title={"Select Brand Kit"} />
  );
};

export default ProjectBrandKit;
