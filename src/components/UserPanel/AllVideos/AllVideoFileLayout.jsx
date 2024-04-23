import VimeoPlayer from "react-player/vimeo";
import { timeAgo } from "../../../utils/converter";

const AllVideoFileLayout = ({ filteredVideos }) => {
  console.log(filteredVideos, "oooooooooooooo");
  return (
    <div>
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: "24px",
        }}
        className="w-full"
      >
        <thead>
          <tr className="text-slate-500 font-medium text-base">
            <th className="text-start ">Name</th>
            {/* <th className="text-start">Status</th> */}
            <th className="text-start">Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {filteredVideos?.length > 0 ? (
            filteredVideos?.map((data, index) => (
              <tr key={index}>
                <td>
                  <div className="flex gap-4 items-center">
                    <div className="w-[113px] h-[64px] rounded-xl">
                      <VimeoPlayer
                        className="bg-gray-400 rounded-xl w-full"
                        url={
                          data?.file
                            ? data?.file
                            : "https://vimeo.com/626780181"
                        }
                        width="100%"
                        height="100%"
                        controls={true}
                      />
                    </div>
                    <p className="text-base font-semibold">{data?.title}</p>
                  </div>
                </td>
                {/* <td>
                  <button
                    className={`${
                      data.status === "Draft" ? "bg-slate-800" : "bg-green-500"
                    } text-white font-semibold text-sm px-[6px] rounded-md`}
                  >
                    {data.status}
                  </button>
                </td> */}
                <td className="text-base font-semibold">
                  {timeAgo(data?.createdAt)}
                </td>
              </tr>
            ))
          ) : (
            <p>There is no data</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllVideoFileLayout;
