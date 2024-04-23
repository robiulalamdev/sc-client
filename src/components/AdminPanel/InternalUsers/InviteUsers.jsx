import { LinkSimple } from "@phosphor-icons/react";
import React, { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

const InviteUsers = ({ setShowInviteUser }) => {
  const [selectIndex, setSelectIndex] = useState(null);
  const userRef = useRef();
  const handleSelect = (index) => {
    if (selectIndex === index) {
      setSelectIndex(null);
    } else {
      setSelectIndex(index);
    }
  };
  useOutsideClick(userRef, () => setShowInviteUser(false));

  return (
    <div
      ref={userRef}
      className="absolute z-auto bg-white top-16 right-0 p-6 shadow-2xl rounded-2xl max-w-[448px] w-full"
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-xl font-bold ">Invite User</p>
        {/* <button className="flex items-center gap-2 text-sm text-indigo-600 font-semibold">
          <LinkSimple size={16} weight="bold" /> Copy Link
        </button> */}
      </div>
      <div className="mb-6 bg-stone-100 rounded-lg flex items-center gap-2 px-4 py-3.5">
        <input
          className="w-full bg-transparent"
          type="email"
          placeholder="Email, comma separated"
        />

        <select className="bg-transparent w-20">
          <option selected>Editor</option>
          <option>Account Manager</option>
          <option>Admin</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        {["Only people invited to this panel", "Anyone with the link"].map(
          (data, index) => (
            <div
              onClick={() => handleSelect(index)}
              key={index}
              className="cursor-pointer flex items-center gap-3"
            >
              <div
                className={`${
                  selectIndex === index ? "border-4 border-black" : "border-2 "
                } h-5 w-5 rounded-full  `}
              ></div>
              <p className="text-sm font-medium ">{data}</p>
            </div>
          )
        )}
      </div>
      <button className="primary_btn w-full">
        {selectIndex === 1 ? (
          <div className="flex items-center justify-center gap-2">
            {" "}
            <LinkSimple size={20} /> Copy Link
          </div>
        ) : (
          "Invite"
        )}
      </button>
    </div>
  );
};

export default InviteUsers;
