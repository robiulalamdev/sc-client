import search from "../../../../assets/search.svg";
import filter from "../../../../assets/filter.svg";
import send from "../../../../assets/send.svg";
import aveter from "../../../../assets/aveter1.svg";
import chatBot from "../../../../assets/noChat.svg";
import { useState } from "react";
import {
  useAddCommentMutation,
  useGetProjectCommentsQuery,
} from "../../../../features/project/projectApi";
import Swal from "sweetalert2";
import { DateConverterWithTime } from "../../../../utils/converter";

const VideoComments = ({ data }) => {
  const [searchInput, setSearchInput] = useState("");

  const [newComment, setNewComment] = useState("");

  const [addComment, { isLoading }] = useAddCommentMutation();

  const { data: projectCommet } = useGetProjectCommentsQuery(data?._id);

  // console.log(projectCommet?.comments, "projectCommet");

  const handleAddComment = async () => {
    const formData = {
      projectId: data?._id,
      comment: newComment,
    };
    try {
      const res = await addComment(formData);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        setNewComment("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleFilter = (value) => {
    if (searchInput) {
      return value.comment.includes(searchInput);
    } else {
      return true;
    }
  };
  return (
    <div className="border rounded-xl p-6 max-h-[70vh]">
      <div className="h-full flex flex-col gap-6 justify-between ">
        <div className="bg-slate-100 rounded-full flex items-center gap-2.5 p-2 ">
          <img src={search} alt="" />
          <input
            className="bg-transparent w-full"
            type="search"
            placeholder="Search comments"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>{/* <img src={filter} alt="" /> */}</button>
        </div>
        {projectCommet && projectCommet?.comments?.length === 0 ? (
          <div className="text-center my-10">
            <img className="mb-6 mx-auto" src={chatBot} alt="" />
            <p className="text-xl font-semibold text-slate-700">No Comments</p>
          </div>
        ) : (
          <div className="overflow-y-auto no_scrollbar max-h-[500px] flex h-full flex-col gap-6">
            {projectCommet &&
              projectCommet?.comments?.length > 0 &&
              projectCommet?.comments
                .filter(handleFilter)
                .map((item, index) => (
                  <div className="activity_card flex gap-2 " key={index}>
                    <div className="left_activity_card">
                      {/* <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={item.user.image ? item.user.image : aveter}
                        alt="activity_img"
                      /> */}

                      {item.user.image ? (
                        <div className="h-10 w-10 rounded-full cursor-pointer ">
                          <img
                            src={item.user.image}
                            alt=""
                            className="h-full w-full object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <button className="text-white uppercase text-sm font-semibold h-10 w-10 cursor-pointer bg-[#4F16A5] rounded-full p-3">
                          {item.user.name.slice(0, 2)}
                        </button>
                      )}
                    </div>
                    <div className="right_activity_card">
                      <h3 className="text-base font-semibold text-slate-900 pb-3">
                        {item.user.name}
                        <span className="bg-blue-500 text-xs font-bold text-white py-2 px-2 rounded ml-[6px]">
                          {item.user.role}
                        </span>
                      </h3>
                      <p className="text-sm font-normal text-slate-700 pb-2">
                        {item.comment}
                      </p>
                      <p className="text-slate-500 text-xs font-medium">
                        {DateConverterWithTime(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        )}
        <div className=" flex items-center gap-2 border rounded-full py-2 pr-2 pl-4">
          <input
            className="w-full"
            type="text"
            placeholder="Write your message"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment || isLoading}
          >
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoComments;
