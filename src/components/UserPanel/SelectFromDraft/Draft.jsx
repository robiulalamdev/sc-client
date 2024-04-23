import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useState } from "react";

import { useGetUserProjectsQuery } from "../../../features/project/projectApi";
import { timeAgo } from "../../../utils/converter";
import { useDispatch } from "react-redux";
import {
  setDraftStep,
  setSelectedProject,
  setShowDraftModal,
} from "../../../features/project/projectSlice";

const Draft = () => {
  const [searchParams, setSearchParams] = useState("");
  const [selected, setSelected] = useState(null);
  const [visibleVideos, setVisibleVideos] = useState(9);
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 9);
  };

  const { data: videos } = useGetUserProjectsQuery("status=Draft");

  const handleFilter = (item) => {
    if (searchParams) {
      return item.projectTitle.includes(searchParams);
    } else {
      return true;
    }
  };

  const handleContinue = () => {
    dispatch(setSelectedProject(selected));
    dispatch(setDraftStep(2));
    // () => setStep(2);
  };

  const filteredData =
    (videos &&
      videos.length > 0 &&
      videos?.slice(0, visibleVideos)?.filter(handleFilter)) ||
    [];

  return (
    <div>
      <div className="flex items-center gap-4 justify-between mb-6">
        <p className="text-xl font-bold">Select From Draft</p>

        <button onClick={() => dispatch(setShowDraftModal(false))}>
          <img src={close} alt="" />
        </button>
      </div>
      <div className="flex items-center gap-5 rounded-full bg-slate-100 p-3 w-full mb-10">
        <MagnifyingGlass size={16} weight="bold" />
        <input
          className="w-full bg-transparent"
          type="search"
          placeholder="Search projects"
          onChange={(e) => setSearchParams(e.target.value)}
        />
      </div>

      <div className="border rounded-3xl mb-10">
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <div
              className="flex items-center justify-between gap-4 p-4 border-b last:border-0 cursor-pointer"
              key={index}
              onClick={() => setSelected(data)}
            >
              <div className="flex items-center gap-4">
                <input
                  className="accent-indigo-600 w-5 h-5"
                  type="checkbox"
                  checked={selected?._id === data._id}
                />
                <div className="relative">
                  <img
                    className="w-[113px] h-[64px] rounded-xl"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyQudo2gDpZS8r1PDPBqiA9cwQ8Bt-e6diLw&usqp=CAU"
                    alt=""
                  />
                  <p className="absolute bottom-1 left-1 px-1.5 py-0.5 text-xs font-semibold bg-slate-900 rounded-md text-white">
                    12.10
                  </p>
                </div>
                <p>{data.projectTitle}</p>
              </div>
              <p>{timeAgo(data?.createdAt)}</p>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
        {visibleVideos < filteredData?.length && (
          <button
            className="text-base font-semibold py-4 px-6 w-full"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="primary_btn w-full"
      >
        Continue
      </button>
    </div>
  );
};

export default Draft;
