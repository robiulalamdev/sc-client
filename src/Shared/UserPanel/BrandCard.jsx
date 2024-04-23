import { Plus } from "@phosphor-icons/react";
import BrandcardInner from "./BrandcardInner";

const BrandCard = ({ brand, inputRefClick }) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {brand.length > 0 ? (
        brand.map((data, index) => <BrandcardInner key={index} data={data} />)
      ) : (
        <p>There is no data</p>
      )}
      <div
        onClick={inputRefClick}
        className="border border-dashed rounded-xl flex items-center justify-center"
      >
        <Plus className="text-indigo-600" size={24} weight="bold" />
      </div>
    </div>
  );
};

export default BrandCard;
