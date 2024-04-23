import React, { useState } from "react";
import DetailsHeader from "../../components/UserPanel/AllVideos/VideoDetails/DetailsHeader";
import Details from "../../components/UserPanel/AllVideos/VideoDetails/Details";
import ExperienceModal from "../../Modal/ExperienceModal";
import VideoComments from "../../components/UserPanel/AllVideos/VideoDetails/VideoComments";
import { useLoaderData, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useGetProjectDetailsQuery,
  useUpdateProjectMutation,
} from "../../features/project/projectApi";
import Swal from "sweetalert2";

const VideoDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProjectDetailsQuery(id);
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();
  const [addReview, { isLoading: reviewing }] = useAddReviewMutation();

  console.log(data, "projectDetails");
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  const [reviewData, setReviewData] = useState({ rating: 0 });

  console.log(reviewData, "reviewData");

  const handleApprove = async () => {
    try {
      const formData = { projectId: data._id, status: "Exported" };
      const res = await updateProject(formData);

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
        const reviewRes = await addReview({ project: data._id, ...reviewData });
        reviewRes?.data?.success && setShowExperienceModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  return (
    <div>
      <DetailsHeader
        setShowExperienceModal={setShowExperienceModal}
        data={data}
        isLoading={updating || reviewing}
      />
      <div className="grid grid-cols-3 gap-[30px]">
        <div className="col-span-2">
          <Details data={data} />
        </div>
        <VideoComments data={data} />
      </div>
      {showExperienceModal && (
        <ExperienceModal
          setShowExperienceModal={setShowExperienceModal}
          handleApprove={handleApprove}
          isLoading={updating || reviewing}
          setReviewData={setReviewData}
          reviewData={reviewData}
        />
      )}
    </div>
  );
};

export default VideoDetails;
