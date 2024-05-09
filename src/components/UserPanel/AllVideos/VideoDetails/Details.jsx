import { DownloadSimple } from "@phosphor-icons/react";

import React, { useEffect, useRef, useState } from "react";
import VimeoPlayer from "react-player/vimeo";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { timeAgo, truncateFilename } from "../../../../utils/converter";
import VideoCard from "../../../../Shared/UserPanel/VideoCard";
import { BASE_API_URL } from "../../../../config/config";

const Details = ({ data }) => {
  const downloadRef = useRef();

  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  useOutsideClick(downloadRef, () => setShowDownloadOptions(false));

  console.log(data, "exxx");

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
            <DownloadFieldComp id={data.exportedUrl.file} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;



const DownloadFieldComp = ({ id }) => {

  const [downloadList, setDownloadList] = useState()

  const regex = /\/video\/(\d+)(?=\?h)/;
  const match = id.match(regex);

  if (match) {
    const videoId = match[1];
    console.log("Video ID:", videoId);
  } else {
    console.log("Video ID not found in URL.");
  }


  const  handleDownloadClick = (link) => {
    console.log("link", link)
    // Replace 'your_download_link_here' with the actual download link
    // For example, you could pass the download link as a prop to the component
    const downloadLink = link;
    
    // Create an anchor element
    const anchorElement = document.createElement('a');
    anchorElement.href = downloadLink;
    anchorElement.download = ''; // Optional: specify a filename for the downloaded file
    document.body.appendChild(anchorElement);
    
    // Trigger a click event on the anchor element
    anchorElement.click();
    
    // Clean up: remove the anchor element from the DOM
    document.body.removeChild(anchorElement);
  }



  const refetch = async () => {
    const res = await fetch(
      `${BASE_API_URL}/v1/vimeo/${match[1]}?fields=transcode.status,download,upload.status,is_playable`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    console.log("result", result.data.download);
    setDownloadList(result.data.download)
  }


  useEffect(() => {
    refetch()
  }, [])



  return (
    <>
      {downloadList?.map((item, index) => (
        <div
          key={index}
          className="py-4 pr-3 pl-6 flex items-center gap-4 justify-between border-b"
        >
          <p className="text-base font-bold ">
            {item.rendition}
            {/* <span className="text-xs font-medium text-slate-500">
            (3840 &#xd7; 2160)
          </span> */}
          </p>
          <button className="flex items-center gap-2.5 text-sm font-semibold" onClick={() => handleDownloadClick(item.link)}  >
            <DownloadSimple
              className="text-indigo-600"
              size={20}
              weight="bold"

            />
            Download {(item.size / (1024 * 1024)).toFixed(2)} MB
          </button>
        </div>
      ))}
    </>
  )
}