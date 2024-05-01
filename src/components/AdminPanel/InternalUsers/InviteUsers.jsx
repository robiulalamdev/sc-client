/* eslint-disable react/prop-types */
import { LinkSimple } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import loading from "../../../assets/loading.svg";
import { useSendInviteMutation } from "../../../features/helpers/helpersApi";

const InviteUsers = ({ setShowInviteUser }) => {
  const [sendInvite] = useSendInviteMutation();
  const [selectIndex, setSelectIndex] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [role, setRole] = useState("EDITOR");

  const [isLoading, setIsLoading] = useState(false);

  const userRef = useRef();
  useOutsideClick(userRef, () => setShowInviteUser(false));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInvite = async () => {
    setIsLoading(true);
    const itemsArray = emailValue?.replaceAll(" ", "")?.split(",");
    const emails = [];
    for (let i = 0; i < itemsArray?.length; i++) {
      if (emailRegex.test(itemsArray[i])) {
        emails.push(itemsArray[i]);
      }
    }

    if (emails.length > 0) {
      const result = await sendInvite({
        emails: emails,
        role: role,
      });
      console.log(result);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

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
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email, comma separated"
        />

        <select
          onChange={(e) => setRole(e.target.value)}
          className="bg-transparent w-20"
        >
          <option value="EDITOR" selected>
            Editor
          </option>
          <option value="MANAGER">Account Manager</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        {["Only people invited to this panel", "Anyone with the link"].map(
          (data, index) => (
            <div
              onClick={() => setSelectIndex(index)}
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

      {selectIndex === 1 ? (
        <button className="primary_btn w-full">
          <div className="flex items-center justify-center gap-2">
            {" "}
            <LinkSimple size={20} /> Copy Link
          </div>
        </button>
      ) : (
        <button
          disabled={isLoading}
          onClick={() => handleInvite()}
          className="primary_btn w-full flex justify-center items-center gap-2"
        >
          {isLoading && <img width={20} src={loading} alt="" />} Invite
        </button>
      )}
    </div>
  );
};

export default InviteUsers;
