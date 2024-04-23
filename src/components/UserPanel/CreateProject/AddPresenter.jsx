import React, { useRef, useState } from "react";
import FromLabel from "./FromLabel";
import camera from "../../../assets/camera.svg";
import brandInput from "../../../assets/brand-img.svg";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setStep } from "../../../features/project/projectSlice";

const AddPresenter = ({ save, isLoading, projectData }) => {
  const [inputData, setInputData] = useState({});
  const brandImgRef = useRef();
  const maxLength = 500;

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        setInputData({ ...inputData, [name]: file });
      }
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleContinue = async () => {
    try {
      const res = await save({
        projectId: projectData?._id,
        presenter: inputData?.name,
      });

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
        // push("/dashboard");
        dispatch(setStep(2));
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
    <div className="border rounded-xl p-6">
      <div className="flex justify-between gap-4 items-start mb-6">
        <FromLabel
          title="Add Presenter"
          subtitle="Are there any presenters in your project?"
        />
        {/* <button className="flex items-center gap-2.5 border rounded-lg py-3.5 px-4 text-sm font-normal">
          <Plus size={20} /> Add New
        </button> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div
          onClick={() => {
            brandImgRef.current.click();
          }}
          className="relative"
        >
          <input
            type="file"
            onChange={handleInputChange}
            ref={brandImgRef}
            className="hidden"
            accept="image/*"
            name="image"
          />

          <img
            className="w-[120px] h-[120px] rounded-full mb-6 cursor-pointer object-cover"
            src={
              inputData?.image
                ? URL.createObjectURL(inputData?.image)
                : brandInput
            }
            alt=""
          />
          <img
            className="absolute translate-y-[-50%] top-[50%] left-[44px]"
            src={camera}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4 mb-6 ">
          <div className="w-full">
            <label className="block text-sm font-semibold mb-2.5">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Enter name of the presenter"
              className="border w-full px-4 py-3.5 rounded-lg"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold mb-2.5">Title</label>
            <input
              type="text"
              name="title"
              className="border w-full px-4 py-3.5 rounded-lg"
              required
              placeholder="The presenters title"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2.5">
            Description (Optional)
          </label>

          <textarea
            cols="30"
            rows="5"
            name="description"
            className="border w-full px-4 py-3.5 rounded-lg"
            placeholder="Tell us more about the presenter"
            value={inputData.description}
            onChange={handleInputChange}
            maxLength={maxLength}
          ></textarea>
          <p className="text-slate-500 text-sm font-normal text-end">
            {inputData?.description?.length
              ? inputData?.description?.length
              : "0"}
            /{maxLength} Characters
          </p>
        </div>

        <button
          disabled={
            !inputData?.image ||
            !inputData?.name ||
            !inputData?.title ||
            isLoading
          }
          className="primary_btn disabled:bg-indigo-300"
          onClick={handleContinue}
        >
          {isLoading ? "Loading..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default AddPresenter;
