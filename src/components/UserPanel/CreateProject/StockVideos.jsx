import ReactPlayer from "react-player";
import MoreBtn from "./MoreBtn";
import check from "../../../assets/check-icon.svg";
import VimeoPlayer from "react-player/vimeo";
import { useState } from "react";

const StockVideos = ({ setSelectedVideo, selectedVideo }) => {
  const videoUrl = [
    "https://vimeo.com/626780181",
    "https://player.vimeo.com/video/928704074?h=916ce7ba54",
    "https://player.vimeo.com/video/928704012?h=4345607487",
    "https://player.vimeo.com/video/928704192?h=3361f1be38",
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const handleSelected = (url) => {
    if (selectedVideo.includes(url)) {
      const newVideo = selectedVideo.filter((i) => i !== url);
      setSelectedVideo(newVideo);
    } else {
      setSelectedVideo([...selectedVideo, url]);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
  return (
    <div className="mb-10">
      <p className="text-xl font-bold mb-6">Stock Videos</p>
      <div className="flex items-center gap-6">
        {videoUrl.map((url, index) => (
          <div
            className={`${
              selectedVideo.includes(url) &&
              "border-2 border-[#C67CFF] p-1 rounded-xl cursor-pointer"
            } ${isPlaying && "scale-125"} relative  w-[211px] h-[108px]  `}
            key={index}
            onClick={() => handleSelected(url)}
          >
            {selectedVideo.includes(url) ? (
              ""
            ) : (
              <img
                onClick={() => handleSelected(url)}
                className="absolute top-2 right-2 cursor-pointer"
                src={check}
                alt=""
              />
            )}
            <VimeoPlayer
              className="bg-gray-400 rounded-xl"
              url="https://vimeo.com/626780181"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        ))}
        <MoreBtn />
      </div>
    </div>
  );
};

export default StockVideos;
