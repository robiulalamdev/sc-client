import close from "../assets/close.svg";
import UploadVideo from "../components/UserPanel/MediaStorage/UploadVideo";

const UploadVideoModal = ({ setOpedUploadVideoModal }) => {
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div className="max-w-[1280px] w-full bg-white text-black p-10 rounded-2xl relative">
        <button
          onClick={() => setOpedUploadVideoModal(false)}
          className="absolute top-5 right-5 "
        >
          <img src={close} alt="" />
        </button>
        <UploadVideo setOpedUploadVideoModal={setOpedUploadVideoModal} />
      </div>
    </div>
  );
};

export default UploadVideoModal;
