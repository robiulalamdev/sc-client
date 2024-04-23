import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FirstBrand = () => {
  const [allBrandKit, setAllBrandKit] = useState([]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-xl font-bold mb-2">Create Your First Brand</p>
      <p className="text-slate-500 text-sm font-normal mb-6">
        This information allows you to create videos faster <br /> and maintain
        consistency across your content.
      </p>

      <Link
        to="/user/brand-kit/create"
        className="flex items-center gap-2 primary_btn"
      >
        <Plus size={24} weight="bold" /> Create
      </Link>
    </div>
  );
};

export default FirstBrand;
