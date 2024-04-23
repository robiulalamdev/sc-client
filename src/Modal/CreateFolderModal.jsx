import React, { useRef } from "react";
import Swal from "sweetalert2";
import {
  useCreateFolderMutation,
  useUpdateFolderMutation,
} from "../features/videos/videoApi";
import useOutsideClick from "../hooks/useOutsideClick";
import close from "../assets/close.svg";

const CreateFolderModal = ({
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
    // <div
    //   className="relative z-50"
    //   aria-labelledby="modal-title"
    //   role="dialog"
    //   aria-modal="true"
    //   onClick={(e) => e.stopPropagation()}
    // >
    //   <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    //   <div className="fixed inset-0 z-10 w-screen overflow-y-auto no_scrollbar">
    //     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //       <form
    //         onSubmit={handleSubmit}
    //         className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
    //       >
    //         <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    //           <div className="sm:flex sm:items-start">
    //             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
    //               <h3
    //                 className="text-xl font-semibold leading-6 text-gray-900"
    //                 id="modal-title"
    //               >
    //                 Folder Name
    //               </h3>
    //               <div className="mt-3 w-full">
    //                 <input
    //                   name="title"
    //                   type="text"
    //                   required
    //                   defaultValue={folderTitle ? folderTitle : ""}
    //                   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    //           <button
    //             type="submit"
    //             className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
    //             disabled={isLoading || updating}
    //           >
    //             {isLoading || updating ? (
    //               "Loading..."
    //             ) : (
    //               <> {folderTitle ? "Update" : "Create"}</>
    //             )}
    //           </button>
    //           <button
    //             type="button"
    //             className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
    //             onClick={() => {
    //               folderTitle && setClickedItem(null);
    //               setOpenCreateFolderModal(false);
    //             }}
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={modalRef}
        className="max-w-md max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black  rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 justify-between mb-4">
          <p className="text-lg font-semibold">New Folder</p>
          <button onClick={() => setOpenCreateFolderModal(false)}>
            <img src={close} alt="" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="border rounded-lg w-full mb-6 px-4 py-3.5"
            type="text"
            name="title"
            placeholder="e.g Video Assets"
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
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
