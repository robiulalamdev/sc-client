import { useRef, useState } from "react";
import close from "../assets/close.svg";
import brandInput from "../assets/brand-img.svg";
import camera from "../assets/camera.svg";
import verifyEmail from "../assets/verify-email.svg";
import { Link } from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { useUpdateUserSettingsMutation } from "../features/auth/authApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { uploadImageToImgBB } from "../utils/imageHosting";

const AccountModal = ({ setShowAccount }) => {
  const [inputData, setInputData] = useState({});

  const { user } = useSelector((state) => state.auth);

  const [updateUserSettings, { isLoading }] = useUpdateUserSettingsMutation();

  const [loading, setLoading] = useState(false);

  const brandImgRef = useRef();
  const modalBodyRef = useRef();

  const [step, setStep] = useState(1);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = { ...inputData };
      const fromData = new FormData();
      fromData.append("image", inputData?.image);

      if (inputData?.image) {
        const uploadImageData = await uploadImageToImgBB(fromData);
        if (uploadImageData?.success) {
          data.image = uploadImageData?.data?.url;
        }
      }

      const res = await updateUserSettings(data);

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
        setShowAccount(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useOutsideClick(modalBodyRef, () => setShowAccount(false));

  return (
    <div className="fixed top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={modalBodyRef}
        className="max-w-[640px] w-full bg-white text-black p-10 rounded-2xl relative"
      >
        <button
          onClick={() => setShowAccount(false)}
          className="absolute top-5 right-5 "
        >
          <img src={close} alt="" />
        </button>

        {/* {step === 1 && ( */}
        <div>
          <p className="text-2xl font-semibold mb-10">Account Settings</p>
          <form onSubmit={handleSubmit}>
            <div
              className="relative w-[120px] h-[120px] rounded-full mb-16"
              onClick={() => {
                brandImgRef.current.click();
              }}
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
                className=" w-full h-full rounded-full mb-6 cursor-pointer object-cover"
                src={
                  inputData?.image
                    ? URL.createObjectURL(inputData?.image)
                    : user?.image
                    ? user?.image
                    : brandInput
                }
                alt="Profile Image"
              />
              <img
                className="absolute translate-y-[-50%] top-[50%] left-[44px] cursor-pointer"
                src={camera}
                alt=""
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2.5">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                className="border w-full px-4 py-3.5 rounded-lg"
                defaultValue={user?.name}
                required
              />
            </div>
            {/* <div className="mb-10">
                <label className="block text-sm font-semibold mb-2.5">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="border w-full px-4 py-3.5 rounded-lg"
                  required
                  onChange={handleInputChange}
                />
              </div> */}
            <button
              disabled={Object.keys(inputData).length === 0 || loading}
              type="submit"
              className={`w-full rounded-full bg-indigo-600 disabled:bg-[#A7A3F2] text-white text-base font-semibold px-6 py-3`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
        {/* )} */}
        {/* {step === 2 && (
          <div className="text-center">
            <img className="mx-auto mb-10" src={verifyEmail} alt="" />
            <p className="text-4xl font-bold mb-3">Verify Email</p>
            <p className="text-lg text-slate-500 font-normal mb-10">
              We have sent you a link at your new email address to verify the
              email changes.{" "}
            </p>
            <Link
              to="/user"
              onClick={() => setShowAccount(false)}
              className={`w-full rounded-full bg-indigo-600  text-white text-base font-semibold px-6 py-3`}
            >
              Return Home
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AccountModal;
