/* eslint-disable react/prop-types */
import {
  CalendarBlank,
  CaretDown,
  TextAa,
  UserPlus,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import InviteUsers from "./InviteUsers";
import useOutsideClick from "../../../hooks/useOutsideClick";

const InternalSectionTitle = ({ filter, handleFilterChange }) => {
  const route = useLocation();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const sortRef = useRef();
  const [showSort, setShowSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Last Modified");

  useOutsideClick(sortRef, () => setShowSort(false));
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowSort(false);
  };
  return (
    <div className="relative">
      <div className="seciton_heading pb-6 flex items-center justify-between">
        <div className="title">
          <h3 className="text-2xl font-bold text-slate-900">
            {route.pathname === "/internal-users"
              ? "10 Internal Users"
              : "All Clients"}
          </h3>
        </div>

        <div className="sorting flex items-center gap-3">
          <div className="button_group bg-slate-100 rounded-full p-1">
            <button
              className={`text-xs font-medium text-slate-600 py-[6px] px-[10px] rounded-full ${
                filter === "All" && "bg-white text-text-slate-600"
              }`}
              onClick={() => handleFilterChange("All")}
            >
              All
            </button>

            <button
              className={`text-xs font-medium text-slate-600 py-[6px] px-[10px] rounded-full ${
                filter === "Admin" && "bg-white text-text-slate-600"
              }`}
              onClick={() => handleFilterChange("Admin")}
            >
              Admin
            </button>

            <button
              className={`text-xs font-medium text-slate-600 py-[6px] px-[10px] rounded-full ${
                filter === "Account Manager" && "bg-white text-text-slate-600"
              }`}
              onClick={() => handleFilterChange("Account Manager")}
            >
              Account Manager
            </button>

            <button
              className={`text-xs font-medium text-slate-600 py-[6px] px-[10px] rounded-full ${
                filter === "Editor" && "bg-white text-text-slate-600"
              }`}
              onClick={() => handleFilterChange("Editor")}
            >
              Editor
            </button>
          </div>

          <div className="relative">
            <div
              onClick={() => setShowSort(!showSort)}
              className="bg-slate-100 border rounded-full p-1"
            >
              <button className="bg-white rounded-full p-1.5 text-xs font-medium flex items-center gap-1">
                Sort by: {selectedOption} <CaretDown size={12} weight="fill" />
              </button>
            </div>
            {showSort && (
              <div
                ref={sortRef}
                className="bg-white w-auto shadow-xl rounded-xl absolute z-50"
              >
                <button
                  onClick={() => handleOptionSelect("Last Modified")}
                  className="text-sm font-medium flex items-center gap-3 px-4 py-2 border-b"
                >
                  <CalendarBlank size={16} weight="bold" /> Last Modified
                </button>
                <button
                  onClick={() => handleOptionSelect("Alphabetical")}
                  className="text-sm font-medium flex items-center gap-3 px-4 py-2 border-b"
                >
                  <TextAa size={16} weight="bold" /> Alphabetical
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowInviteUser(true)}
            className="text-xs font-semibold text-white bg-black flex gap-2 py-[10px] px-[16px] rounded-full"
          >
            <UserPlus size={16} weight="bold" />
            Invite User
          </button>
        </div>
      </div>
      {showInviteUser && <InviteUsers setShowInviteUser={setShowInviteUser} />}
    </div>
  );
};

export default InternalSectionTitle;
