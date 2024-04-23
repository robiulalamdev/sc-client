import { DotsThreeOutline, PencilSimple, Trash } from "@phosphor-icons/react";
import folderIcon from "../../../assets/folder.svg";
import { formatFileSize } from "../../../utils/converter";
import { useNavigate } from "react-router";
import { useState } from "react";
import Deleting from "../../../Modal/Deleting";
import EditModal from "../../../Modal/EditModal";

const FolderCard = ({ folder, setClickedItem, clickedItem }) => {
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.stopPropagation();
    if (clickedItem === id) {
      setClickedItem(null);
    } else {
      setClickedItem(id);
    }
  };

  const [openEditFolderModal, setEditFolderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [title, setTitle] = useState(null);

  return (
    <div>
      <div
        className="text-center relative cursor-pointer"
        onClick={() => navigate(`/user/media-storage/folder/${folder?._id}`)}
      >
        <button
          className="absolute -top-6 -right-6"
          onClick={(e) => handleClick(e, folder._id)}
        >
          <DotsThreeOutline
            className="text-slate-500"
            size={20}
            weight="fill"
          />
        </button>

        {clickedItem === folder._id && (
          <div
            className="absolute top-0 -right-40 z-40 bg-white w-[196px]  shadow-xl  rounded-xl "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-sm font-medium flex items-center gap-3 px-4 py-3 border-b w-full"
              onClick={(e) => {
                e.stopPropagation();
                setEditFolderModal(true);
                setTitle(folder.title);
              }}
            >
              <PencilSimple size={16} weight="bold" /> Rename
            </button>
            <button
              className="text-sm font-medium flex items-center gap-3 px-4 py-3 w-full"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModal(true);
                setTitle(folder.title);
              }}
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        )}

        <img className="m-auto mb-2" src={folderIcon} alt="" />
        <p className="text-base font-bold mb-2">{folder?.title}</p>
        <p className="text-slate-400 text-xs">
          {formatFileSize(folder?.folderSize)}
        </p>
      </div>
      {openEditFolderModal && (
        <EditModal
          setOpenCreateFolderModal={setEditFolderModal}
          folderTitle={title}
          clickedItem={clickedItem}
          setClickedItem={setClickedItem}
        />
      )}
      {deleteModal && (
        <Deleting
          setDeleteModal={setDeleteModal}
          folderTitle={title}
          clickedItem={clickedItem}
          setClickedItem={setClickedItem}
        />
      )}
    </div>
  );
};

export default FolderCard;
