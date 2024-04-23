import { CaretRight } from "@phosphor-icons/react";
import aveter from "../../../assets/aveter1.svg";

const RecentWorks = () => {
  return (
    <div className="border rounded-2xl">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold ">
            <th className="p-4 text-start">Client</th>
            <th className="text-start">Project Name</th>
            <th className="text-start">Duration</th>
            <th className="text-start">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <tr key={index} className="text-sm font-normal">
              <td className="border-t p-4 flex items-center gap-3 font-semibold">
                <img className="w-10 h-10 rounded-full" src={aveter} alt="" />{" "}
                Xavier Davis
              </td>
              <td className="border-t">Product Showcase Video</td>
              <td className="border-t">4 days</td>
              <td className="border-t ">
                <div className="flex items-center gap-3 ">
                  September 10, 2023 <CaretRight size={20} weight="bold" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentWorks;
