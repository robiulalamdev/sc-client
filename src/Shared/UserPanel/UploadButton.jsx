import React from "react";

const UploadButton = ({ handleFunction }) => {
  return (
    <button
      type="button"
      onClick={handleFunction}
      className="border border-indigo-600 text-indigo-600 rounded-full py-2 px-6"
    >
      Upload
    </button>
  );
};

export default UploadButton;
