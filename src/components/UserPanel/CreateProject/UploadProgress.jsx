import mp4 from "../../../assets/mp4.svg";

const UploadProgress = ({ uploadProgress, newSelectedVideo }) => {
  const totalSize = newSelectedVideo?.reduce(
    (total, current) => total + current?.size,
    0
  );

  return (
    <div className="fixed top-0 right-0 w-full h-full backdrop-blur-sm p-10">
      <div className="max-w-[384px] text-start  bg-white shadow  p-4 rounded-xl ml-auto">
        <div className="flex items-center gap-2">
          <img src={mp4} alt="" />
          <div>
            <p>{newSelectedVideo[0].name}</p>
            <p> {(totalSize / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        </div>
        <div className="flex  items-center gap-2 ">
          <div className="bg-indigo-50 h-2 w-full rounded-md">
            <div
              style={{ width: `${uploadProgress}%` }}
              className="bg-indigo-600 rounded-md h-2"
            ></div>
          </div>
          <p className="text-xs font-medium">{uploadProgress}%</p>
        </div>
        <button className="text-red-500 font-semibold text-sm">
          Cancel Upload
        </button>
      </div>
    </div>
  );
};

export default UploadProgress;
