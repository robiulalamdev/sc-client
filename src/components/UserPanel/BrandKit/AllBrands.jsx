import {
  CalendarBlank,
  CaretDown,
  DotsThreeOutline,
  Plus,
  TextAa,
} from "@phosphor-icons/react";
import brand from "../../../assets/socreative-brand.svg";
import { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useViewFile from "../../../hooks/useViewFile";

const AllBrands = ({ setStep, data = [] }) => {
  const { viewImg } = useViewFile();
  const sortRef = useRef();
  const [showSort, setShowSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Last Modified");

  useOutsideClick(sortRef, () => setShowSort(false));
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowSort(false);
  };
  return (
    <div>
      <div className="flex items-center gap-3 justify-between mb-6">
        <p className="text-xl font-bold">All Brand Kits</p>
        <div className="flex items-center gap-3">
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
            onClick={() => setStep(1)}
            className="primary_btn py-2 px-3 flex items-center gap-1"
          >
            <Plus size={20} weight="bold" /> Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {data?.map((item, index) => (
          <div
            key={index}
            className="border rounded-3xl p-8 flex items-center gap-8 relative"
          >
            <button className="absolute top-8 right-8">
              <DotsThreeOutline size={24} weight="fill" />
            </button>
            <img
              src={viewImg(item?.brandLogo) || brand}
              alt=""
              className="max-w-[120px] max-h-[120px] min-w-[120px] rounded-full object-contain bg-gray-100"
            />
            <div>
              <p className="text-xl font-bold mb-3">{item?.brandName}</p>
              <p className="text-sm text-slate-500 font-normal">
                We are platform looking forward to build a collaborative video
                creation platform for business that will help them to grow on
                their social media to generate healthy revenues.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBrands;
