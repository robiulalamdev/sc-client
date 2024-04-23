import search from "../../assets/search.svg";
import arrow from "../../assets/arrow-right.svg";
import { helps } from "../../utils/data";
import { useState } from "react";

const HelpOptions = ({ setStep }) => {
  const [inputSearch, setInputSearch] = useState("");
  const handleFilter = (item) => {
    if (inputSearch) {
      return item.title
        .toLocaleLowerCase()
        .includes(inputSearch.toLocaleLowerCase());
    } else {
      return true;
    }
  };
  return (
    <div>
      <div className="bg-slate-100 rounded-full flex items-center gap-3 pl-4 p-2 mb-8">
        <img src={search} alt="" />
        <input
          className="w-full bg-transparent"
          type="search"
          placeholder="Search for help"
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        {helps.length > 0 ? (
          helps.filter(handleFilter).map((data, index) => (
            <div
              onClick={() => setStep(2)}
              className="border rounded-xl py-3 px-4 flex items-center gap-2 justify-between cursor-pointer"
              key={index}
            >
              <div>
                <p className="mb-2 text-base font-bold ">{data.title}</p>
                <p className="text-sm font-medium">{data.no} articles</p>
              </div>
              <img src={arrow} alt="" />
            </div>
          ))
        ) : (
          <p>There is no data</p>
        )}
      </div>
    </div>
  );
};

export default HelpOptions;
