import React, { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import close from "../assets/close.svg";
import { Trash } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import {
  useDeleteFileMutation,
  useRemoveFolderMutation,
} from "../features/videos/videoApi";

const Deleting = ({
  setDeleteModal,
  folderTitle,
  clickedItem,
  setClickedItem,
  file,
}) => {
  const [removeFolder, { isLoading }] = useRemoveFolderMutation();
  const [deleteFile, { isLoading: fileDeleting }] = useDeleteFileMutation();

  const handleDelete = async () => {
    try {
      const res = file
        ? await deleteFile({
            fileId: clickedItem,
            folderId: file.parentFolderId,
          })
        : await removeFolder(clickedItem);

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
        setDeleteModal(false);
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

  const modalRef = useRef();
  useOutsideClick(modalRef, () => setDeleteModal(false));
  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={modalRef}
        className="max-w-md max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black  rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 justify-between mb-4">
          <button className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Trash className="text-red-500" size={24} weight="fill" />
          </button>
          <button onClick={() => setDeleteModal(false)}>
            <img src={close} alt="" />
          </button>
        </div>
        <div>
          <p className="text-lg font-semibold mb-1">
            Are you sure you want to delete?
          </p>{" "}
          <p className="text-slate-600 text-xs font-normal mb-6">
            Deleting this folder will remove all of its content and the action
            can not be undone.
          </p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => setDeleteModal(false)}
            className="text-red-500 py-3 px-6 rounded-full border border-red-500"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-red-500 rounded-full py-3 px-6"
            onClick={handleDelete}
            disabled={isLoading || fileDeleting}
          >
            {isLoading || fileDeleting ? "Deleting..." : "Yes, I Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deleting;
