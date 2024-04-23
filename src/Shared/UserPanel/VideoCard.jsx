import { timeAgo } from "../../utils/converter";
import VimeoPlayer from "react-player/vimeo";

const VideoCard = ({ name, data, time }) => {
  console.log("VideoCard data: ", data, name, time);
  return (
    <div>
      <div className="relative  mr-6 ">
        {" "}
        <div className="overflow-hidden w-full rounded-xl max-h-[160px] h-full mb-4 relative group">
          <VimeoPlayer
            className="bg-gray-400 rounded-xl w-full"
            url={data?.file ? data?.file : "https://vimeo.com/626780181"}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </div>
      <p className="text-base  font-semibold mb-1">{name}</p>
      <p className="text-slate-500 text-sm font-normal">
        Created {timeAgo(time)}
      </p>
    </div>
  );
};

export default VideoCard;
