import React from "react";
import companyLogo from "../../../assets/company-logo.svg";
import companyEdit from "../../../assets/company-edit.svg";
import { plans } from "../../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const TeamSettings = ({ setShowTeamModal }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  console.log("data?.slug.toLocaleLowerCase() plans", plans);
  console.log("data?.slug.toLocaleLowerCase()", user);

  return (
    <div>
      <div className="flex items-center gap-4 justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={companyLogo} alt="" />
            <img
              className="absolute -bottom-1.5 -right-1.5"
              src={companyEdit}
              alt=""
            />
          </div>
          <div>
            <p className="text-base font-semibold">Company Name</p>
            <p className="text-slate-500 text-xs font-normal">Starter</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-700 font-medium mb-1">Sep 2, 2023</p>
          <p className="text-xs text-slate-500 font-normal">Sep 2, 2023</p>
        </div>
      </div>
      <div className="flex items-center gap-6 mb-6">
        {plans.slice(0, 2).map((data, index) => (
          <div className="p-5 rounded-2xl bg-slate-900 text-white" key={index}>
            <img className="mb-4" src={data.pic} alt="" />
            <p className="text-lg font-bold mb-2">{data.title}</p>
            <p className="text-sm font-normal mb-4">{data.subtitle}</p>
            <Link
              to="#"
              className="text-sm font-semibold flex items-center gap-1 mb-4"
            >
              Learn More <ArrowRight size={16} weight="bold" />
            </Link>
            <button
              // disabled={
              //   data?.slug.toLocaleLowerCase() ===
              //   user?.currentPlan.toLocaleLowerCase()
              // }
              onClick={() => {
                navigate(`/user/subscribe/${data.slug}`);
                setShowTeamModal(false);
              }}
              className="bg-white rounded-full py-1.5 px-4 w-full text-slate-900 text-sm font-semibold disabled:bg-gray-400 disabled:text-white"
            >
              Upgrade
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 mb-6">
        {plans.slice(2, 4).map((data, index) => (
          <div className="p-5 rounded-2xl bg-slate-900 text-white" key={index}>
            <img className="mb-4" src={data.pic} alt="" />
            <p className="text-lg font-bold mb-2">{data.title}</p>
            <p className="text-sm font-normal mb-4">{data.subtitle}</p>
            <Link
              to="#"
              className="text-sm font-semibold flex items-center gap-1 mb-4"
            >
              Learn More <ArrowRight size={16} weight="bold" />
            </Link>
            <button
              // disabled={
              //   data?.slug.toLocaleLowerCase() ===
              //   user?.currentPlan.toLocaleLowerCase()
              // }
              onClick={() => {
                navigate(`/user/subscribe/${data.slug}`);
                setShowTeamModal(false);
              }}
              className="bg-white rounded-full py-1.5 px-4 w-full text-slate-900 text-sm font-semibold disabled:bg-gray-400 disabled:text-white"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
      <div className="p-5 border rounded-2xl flex items-start gap-5 justify-between mb-[53px]">
        <div>
          <p className="text-base font-semibold mb-2">
            Anyone with a example.com can join
          </p>
          <p className="text-slate-500 text-xs text-normal">
            Allow anyone with an email address at this domain to join your
            workspace. New collaborators will be included in the billing
            automatically.
          </p>
        </div>
        <label
          htmlFor="default-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            value=""
            id="default-toggle"
            className="sr-only peer"
          />
          <div className="w-[50px] h-7 bg-slate-200 peer-focus:outline-none  peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[0] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <button className="text-red-500 text-base font-semibold py-1.5 px-[16px] border border-red-500 rounded-full">
        Delete Team
      </button>
    </div>
  );
};

export default TeamSettings;
