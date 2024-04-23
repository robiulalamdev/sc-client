import React, { useState } from "react";
import FromLabel from "../CreateProject/FromLabel";
import { notificationSettings } from "../../../utils/data";
import { CaretDown } from "@phosphor-icons/react";

const Notifications = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleOptions = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  return (
    <div>
      <FromLabel
        title="Manage your notification settings"
        subtitle="We may still send you important notifications about your account and content outside of your preferred notification settings."
      />
      <div>
        {notificationSettings.map((data, index) => (
          <div key={index}>
            <div
              onClick={() => toggleOptions(index)}
              className="flex cursor-pointer items-start gap-4 justify-between border rounded-2xl p-5 mb-3"
            >
              <div className="flex items-start gap-2">
                <img src={data.pic} alt="" />
                <div>
                  <p className="text-base font-semibold">{data.title}</p>
                  <p className="text-xs text-slate-500 font-normal">
                    {data.subtitle}
                  </p>
                </div>
              </div>
              <button>
                <CaretDown size={24} weight="bold" />
              </button>
            </div>
            {expandedIndex === index && (
              <div className="border rounded-2xl mb-6">
                {data.options.map((option, idx) => (
                  <div
                    className={`${
                      data.options.length - 1 === idx ? "" : "border-b"
                    } p-4 flex items-center gap-3`}
                    key={idx}
                  >
                    <input type="checkbox" id={option} />
                    <label className="text-xs font-normal" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="primary_btn w-full ">Save Changes</button>
    </div>
  );
};

export default Notifications;
