import React, { useRef, useState } from "react";
import close from "../assets/close.svg";
import useOutsideClick from "../hooks/useOutsideClick";

const ExperienceModal = ({
  setShowExperienceModal,
  handleApprove,
  isLoading,
  reviewData,
  setReviewData,
}) => {
  const experienceRef = useRef();

  const handleStarClick = (selectedRating) => {
    setReviewData({ ...reviewData, rating: selectedRating });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  useOutsideClick(experienceRef, () => setShowExperienceModal(false));
  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={experienceRef}
        className="max-w-[448px] max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black p-10 rounded-2xl relative"
      >
        <button
          onClick={() => setShowExperienceModal(false)}
          className="absolute top-5 right-5 "
        >
          <img src={close} alt="" />
        </button>
        <div>
          <p className="text-black font-semibold text-2xl mb-4 text-center">
            How was your experience?
          </p>
          <div className="flex items-center justify-center mb-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <p
                key={star}
                onClick={() => handleStarClick(star)}
                className={`${
                  star <= reviewData.rating
                    ? "text-amber-400"
                    : "text-slate-200"
                } text-5xl cursor-pointer`}
              >
                &#9733;
              </p>
            ))}
          </div>
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2.5 block">
              What did you like?
            </label>
            <textarea
              className="border w-full px-4 py-3.5 rounded-lg"
              rows="5"
              placeholder="Start typing here..."
              name="comments"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2.5 block">
              What can we improve
            </label>
            <textarea
              className="border w-full px-4 py-3.5 rounded-lg"
              rows="5"
              placeholder="Start typing here..."
              name="suggestions"
              onChange={handleInputChange}
            />
          </div>
          <button
            className="primary_btn w-full"
            disabled={isLoading}
            onClick={handleApprove}
          >
            {isLoading ? "Submiting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
