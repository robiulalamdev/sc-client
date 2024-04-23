import React, { useEffect, useRef, useState } from "react";
import BrandUpload from "../../../Shared/UserPanel/BrandUpload";
import brandInput from "../../../assets/brand-img.svg";
import camera from "../../../assets/camera.svg";
import created from "../../../assets/created.svg";
import Confetti from "react-confetti";

import { guidelines } from "../../../utils/data";
import { useNavigate } from "react-router-dom";
import Creating from "./Creating";
import { Plus } from "@phosphor-icons/react";
import BrandKitEditor from "./BrandKitEditor";
import { useCreateBrandMutation } from "../../../features/brand-kit/brandKitApi";

const BrandGuidelines = () => {
  const [createBrand] = useCreateBrandMutation();
  const [brandImg, setBrandImg] = useState(null);
  const [description, setDescription] = useState("");
  const [brandname, setBrandname] = useState("");
  const [brand, setBrand] = useState({});

  const [allbrand, setAllBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const brandImgRef = useRef();
  const guidelinesInputRefs = useRef(
    Array.from({ length: guidelines.length }).map(() => React.createRef())
  );
  const navigate = useNavigate();

  const maxLength = 500;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBrandImg(file);
    }
  };

  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;
    setDescription(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading("loading");
    // console.log("brand", brandname);
    // console.log("brandImg", brandImg);
    // console.log("description", description);

    // setAllBrand([
    //   ...allbrand,
    //   {
    //     brand: brand,
    //     name: brandname,
    //     Description: description,
    //     brandLogo: brandImg,
    //   },
    // ]);

    const data = {
      brand: brand, // Each property is an array
      brandName: brandname,
      brandDescription: description,
      brandLogo: brandImg,
    };

    const formData = new FormData();

    // Append brand data if it exists
    if (data?.brand) {
      for (const [key, value] of Object.entries(data.brand)) {
        value.forEach((el) => {
          formData.append(`brand[${key}]`, el);
        });
      }
    }

    // Append brand logo if it exists
    if (brandImg) {
      formData.append("brandLogo", brandImg);
    }

    // Append name if it exists
    if (brandname) {
      formData.append("brandName", brandname);
    }

    // Append description if it exists
    if (description) {
      formData.append("brandDescription", description);
    }

    // Assuming createBrand is an asynchronous function that sends data to create a brand
    const result = await createBrand(formData);
    if (result?.data?.success) {
      setIsLoading("done");
    }
    setIsLoading("done");

    // setIsLoading("loading");

    // setTimeout(() => {
    //   setIsLoading("done");
    // }, 1000);
  };

  const handleAssetPortion = () => {
    const url = "https://player.vimeo.com/video/929420372?h=2df2a64de8";
    const regex = /\/video\/(\d+)\?/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    console.log("Video id: ", videoId);
  };

  // console.log("setAllBrand", allbrand);

  const handleChange = (e, fieldName, index) => {
    const file = e.target.files[0];
    setBrand((prevState) => ({
      ...prevState,
      [fieldName]: [...(prevState[fieldName] || []), file],
    }));
  };

  return (
    <>
      {isLoading === "loading" && <Creating isLoading={isLoading} />}
      {isLoading === false && (
        <form
          onSubmit={handleSubmit}
          className="flex items-start justify-between gap-10 "
        >
          <div className="w-1/2 flex flex-col gap-10 ">
            {/* {
            guidelines.length > 0 ? (
              guidelines.map((data, index) => (
                <div key={index}>
                  {data.inputName === "colors" ? (
                    <input
                      type="color"
                      className="h-0 w-0 border-0 hidden"
                      onChange={(e) => handleChange(e, data.inputName)}
                      ref={guidelinesInputRefs.current[index]}
                    />
                  ) : (
                    <input
                      type="file"
                      name={data.inputName}
                      accept={data?.acceptType}
                      className="hidden"
                      onChange={(e) => handleChange(e, data.inputName)}
                      ref={guidelinesInputRefs.current[index]}
                    />
                  )}

                  <BrandUpload
                    brandData={brand}
                    title={data.title}
                    subTitle={data.subtitle}
                    buttonName={data.buttonName}
                    inputName={data.inputName}
                    acceptType={data?.acceptType}
                    inputRefClick={() =>
                      guidelinesInputRefs.current[index].current.click()
                    }
                  />
                </div>
              ))



            ) : (
              <p>There is no data</p>
            )} */}
            <BrandKitEditor brand={brand} setBrand={setBrand} />
          </div>
          <div className="max-w-[584px] w-full border rounded-3xl p-10 fixed right-16">
            <div
              onClick={() => brandImgRef.current.click()}
              className="relative"
            >
              <input
                type="file"
                onChange={handleImageChange}
                ref={brandImgRef}
                className="hidden"
                accept="image/*"
              />

              <img
                className="w-[120px] h-[120px] rounded-full mb-6 cursor-pointer object-cover"
                src={brandImg ? URL.createObjectURL(brandImg) : brandInput}
                alt=""
              />
              <img
                className="absolute translate-y-[-50%] top-[50%] left-[44px]"
                src={camera}
                alt=""
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2.5">
                Brand Name
              </label>
              <input
                type="text"
                value={brandname}
                onChange={(e) => setBrandname(e.target.value)}
                className="border w-full px-4 py-3.5 rounded-lg"
                placeholder="Enter your brand name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2.5">
                Description
              </label>

              <textarea
                cols="30"
                rows="5"
                className="border w-full px-4 py-3.5 rounded-lg"
                placeholder="Tell us more about your brand"
                value={description}
                onChange={handleDescriptionChange}
                maxLength={maxLength}
              ></textarea>
              <p className="text-slate-500 text-sm font-normal text-end">
                {description.length}/{maxLength} Characters
              </p>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-indigo-600 text-white text-base font-semibold px-6 py-3"
            >
              Save Brand
            </button>
          </div>
        </form>
      )}

      {isLoading === "done" && (
        <div className="h-full flex flex-col items-center justify-center">
          <Confetti recycle={false} />

          <>
            <img className="mb-10" src={created} alt="" />
            <p className="text-4xl font-bold mb-3">
              SoCreative Brand Kit Created!
            </p>
            <p className="max-w-[768px] text-center text-lg font-normal text-slate-500 mb-6">
              Use your brand assets to bring harmonous asthetics across your
              projects. You can also add a new brand kit if you have more one to
              brand to add.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsLoading(false)}
                className="border border-indigo-600 rounded-full py-3 px-6 flex items-center gap-2 text-indigo-600 text-base font-semibold"
              >
                <Plus size={20} weight="bold" /> Add New
              </button>
              <button
                onClick={() => navigate("/user/brand-kit")}
                className="border border-indigo-600 bg-indigo-600 rounded-full py-3 px-6 f text-white text-base font-semibold"
              >
                Continue
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default BrandGuidelines;
