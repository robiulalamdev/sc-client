import { DownloadSimple } from "@phosphor-icons/react";

import React, { useRef, useState } from "react";
import VimeoPlayer from "react-player/vimeo";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { timeAgo, truncateFilename } from "../../../../utils/converter";
import VideoCard from "../../../../Shared/UserPanel/VideoCard";

const Details = ({ data }) => {
  const downloadRef = useRef();

  console.log(data, "exxx");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  useOutsideClick(downloadRef, () => setShowDownloadOptions(false));
  return (
    <div>
      {data?.exportedUrl ? (
        <div className="h-[570px] mb-5">
          <VimeoPlayer
            className="bg-gray-400 rounded-xl"
            url={data.exportedUrl.file}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      ) : (
        <div className="h-[570px] mb-5 flex gap-10  flex-wrap">
          {data?.files.map((item, idx) => (
            <VideoCard
              key={idx}
              data={item?.fileData}
              name={truncateFilename(item.fileData.title)}
              status={item.fileData.status}
              time={item.fileData.createdAt}
            />
          ))}
        </div>
      )}
      <div>
        <div className="flex items-center gap-4 justify-between">
          <div>
            <p className="text-2xl font-semibold mb-1">{data?.projectTitle}</p>
            <p className="text-slate-500 font-normal text-base">
              updated {timeAgo(data?.updatedAt)}
            </p>
          </div>
          {data?.exportedUrl && (
            <button
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              className="flex items-center gap-2.5 bg-slate-900 text-white py-2.5 px-[30px] rounded-full text-sm font-semibold"
            >
              <DownloadSimple size={20} weight="bold" /> Download Video
            </button>
          )}
        </div>
        {showDownloadOptions && (
          <div
            ref={downloadRef}
            className="max-w-[477px]  bg-white w-full shadow-2xl rounded-2xl ml-auto"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={index}
                className="py-4 pr-3 pl-6 flex items-center gap-4 justify-between border-b"
              >
                <p className="text-base font-bold ">
                  2160p{" "}
                  <span className="text-xs font-medium text-slate-500">
                    (3840 &#xd7; 2160)
                  </span>
                </p>
                <button className="flex items-center gap-2.5 text-sm font-semibold">
                  <DownloadSimple
                    className="text-indigo-600"
                    size={20}
                    weight="bold"
                  />
                  Download 99.23MB
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
