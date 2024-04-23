import close from "../../assets/close.svg";
import secure from "../../assets/secure.svg";
import credit from "../../assets/credit.svg";
import minus from "../../assets/minus.svg";
import creditPlus from "../../assets/creditPlus.svg";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Credit = ({ setShowCredit, creditRef }) => {
  const [count, setCount] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const navigate = useNavigate();

  const purchaseHandler = () => {
    navigate(`/user/purchase-credit/${count}`);
    setShowCredit(false);
  };

  return (
    <div
      ref={creditRef}
      className="fixed z-[9999] top-[84px] right-[210px]  w-full max-h-[85vh] overflow-y-auto no_scrollbar  bg-white rounded-2xl shadow-2xl  max-w-[448px]"
    >
      <div className="p-8">
        <div className="flex items-center gap-2 justify-between mb-8">
          <div>
            <p className="text-slate-500 text-xs font-medium mb-1">Balance</p>
            <p className="text-sm font-semibold">{user?.credit} Credit</p>
          </div>
          <button onClick={() => setShowCredit(false)}>
            <img src={close} alt="" />
          </button>
        </div>
        <div className="text-center mb-8">
          <img className="m-auto mb-4" src={credit} alt="" />
          <p className="text-2xl font-bold mb-2">Purchase Credit</p>
          <p className="text-slate-500 text-base font-normal">
            You can purchase one off credits for $500 each
          </p>
        </div>
        <div className="border rounded-full flex items-center justify-between gap-2 p-2 mb-8">
          <button onClick={handleDecrement}>
            <img src={minus} alt="" />
          </button>
          <p className="text-lg font-bold">{count} Credit</p>
          <button onClick={handleIncrement}>
            <img src={creditPlus} alt="" />
          </button>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <p className="text-base font-normal">
            Total Cost: <span className="font-bold">${count * 11.5}</span>{" "}
          </p>
          <button
            onClick={() => purchaseHandler()}
            disabled={count === 0}
            className="bg-indigo-600 rounded-full text-base font-semibold text-white px-6 py-3"
          >
            Purchase Now
          </button>
        </div>
      </div>
      <div className="bg-slate-100 flex items-center justify-center gap-3 p-4 ">
        <img src={secure} alt="" />
        <p className="text-sm font-medium">
          This is a secure 256-bit SSL encrypted payment.
        </p>
      </div>
    </div>
  );
};

export default Credit;
