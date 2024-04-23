import React, { useRef } from "react";
import Swal from "sweetalert2";
import {
  useCreateFolderMutation,
  useUpdateFolderMutation,
} from "../features/videos/videoApi";
import useOutsideClick from "../hooks/useOutsideClick";
import close from "../assets/close.svg";

const EditModal = ({
  setOpenCreateFolderModal,
  folderTitle,
  clickedItem,
  setClickedItem,
}) => {
  const [createFolder, { isLoading }] = useCreateFolderMutation();
  const [updateFolder, { isLoading: updating }] = useUpdateFolderMutation();
  const modalRef = useRef();
  useOutsideClick(modalRef, () => setClickedItem(false));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    try {
      const res = folderTitle
        ? await updateFolder({ id: clickedItem, data: { title: title } })
        : await createFolder({ title: title });

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
        setOpenCreateFolderModal(false);
        folderTitle && setClickedItem(null);
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
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={modalRef}
        className="max-w-md max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black  rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 justify-between mb-4">
          <p className="text-lg font-semibold">Rename</p>
          <button onClick={() => setOpenCreateFolderModal(false)}>
            <img src={close} alt="" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="border rounded-lg w-full mb-6 px-4 py-3.5"
            type="text"
            name="title"
            required
            defaultValue={folderTitle ? folderTitle : ""}
          />
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => {
                folderTitle && setClickedItem(null);
                setOpenCreateFolderModal(false);
              }}
              className="text-indigo-600 py-3 px-6 rounded-full border border-indigo-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || updating}
              className="primary_btn"
            >
              Rename
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
