import React from "react";
import ProfileActive from "../../../Shared/UserPanel/ProfileActive";

const InvitePeople = () => {
  return (
    <div>
      <p className="text-base font-semibold mb-4">Invite People</p>
      <div className="flex items-center gap-3 mb-6">
        <input className="w-full py-3.5 px-4 border rounded-md" type="email" placeholder="Enter email address here" />
        <select className="py-3.5 px-4 border rounded-md w-72">
            <option value="Workspace Editor">Workspace Editor</option>
            <option value="another">another</option>
            <option value="another 2">another 2</option>     
        </select>
      </div>
      <button className="text-base font-semibold py-1.5 px-[18px] text-indigo-600 border border-indigo-600 rounded-full mb-6">Invite</button>

      <p className="text-base font-semibold mb-4">Members</p>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-[14px]">
        <ProfileActive/>
        <div>
            <p className="text-base font-bold mb-1">James</p>
            <p className="text-slate-500 font-normal text-sm">James</p>
        </div>
        </div>
        <p className="text-sm font-normal text-slate-600">Owner</p>
      </div>

    </div>
  );
};

export default InvitePeople;
