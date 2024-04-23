import { useState } from "react";
import avater from "../../../assets/avater.svg";
import MoreBtn from "./MoreBtn";

const AllAvater = ({ selectedAveter, setSelectedAveter }) => {
  const avatars = ["Avatar1", "Avatar2", "Avatar3", "Avatar4", "Avatar5"];
  const handleSelected = (avt) => {
    if (selectedAveter.includes(avt)) {
      const newAveter = selectedAveter.filter((i) => i !== avt);
      setSelectedAveter(newAveter);
    } else {
      setSelectedAveter([...selectedAveter, avt]);
    }
  };
  return (
    <div>
      <p className="text-xl font-bold mb-6">AI Avatars</p>
      <div className="flex items-center gap-6">
        {avatars.map((avt, index) => (
          <div
            onClick={() => handleSelected(avt)}
            className={`${
              selectedAveter.includes(avt)
                ? " border-indigo-600"
                : "border-transparent"
            } rounded-xl overflow-hidden border cursor-pointer`}
            key={index}
          >
            <img src={avater} alt="" />
          </div>
        ))}
        <MoreBtn />
      </div>
    </div>
  );
};

export default AllAvater;
