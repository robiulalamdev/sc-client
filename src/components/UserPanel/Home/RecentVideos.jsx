import { Link } from "react-router-dom";
import VideoCard from "../../../Shared/UserPanel/VideoCard";
import arrow from "../../../assets/arrow-right.svg";
import { videos } from "../../../utils/data";
import { truncateFilename } from "../../../utils/converter";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RecentVideos = ({ data }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mb-24">
      <div className="flex items-center gap-4  mb-6">
        <p className=" text-xl font-bold ">Recent Videos</p>
        <Link
          to="/user/all-videos"
          className="text-indigo-600 text-base font-semibold flex items-center gap-1"
        >
          All Videos
          <img src={arrow} alt="" />
        </Link>
      </div>

      <Carousel swipeable={true} responsive={responsive}>
        {data?.length > 0 ? (
          data.map((item, index) => (
            <VideoCard
              key={index}
              name={truncateFilename(item.title)}
              status={item.status}
              time={item?.createdAt}
              data={item}
            />
          ))
        ) : (
          <p>There is no data</p>
        )}
      </Carousel>
      {/* </div> */}
    </div>
  );
};

export default RecentVideos;
