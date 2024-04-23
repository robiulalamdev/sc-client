import arrowLeft from "../../assets/arrow-left.svg";
import helpQuery from "../../assets/help-ans.svg";
import open from "../../assets/open.svg";
import { Link } from "react-router-dom";
import { answers, reactions } from "../../utils/data";

const ChangeEmail = ({ setStep }) => {
  return (
    <div>
      <div
        className=" flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => setStep(2)}
      >
        <img src={arrowLeft} alt="" />
        <p className="text-base text-indigo-600 font-bold">
          How to change the email address of your account?{" "}
        </p>
      </div>
      <div>
        <p className="text-base font-normal mb-4">
          This article will show you how to change your account's email address.
        </p>
        <div className="flex flex-col gap-4 pb-8 border-b">
          {answers.length > 0 ? (
            answers.map((data, index) => (
              <div key={index}>
                <p className="text-base font-normal mb-4">
                  {index + 1}. {data}
                </p>
                <img src={helpQuery} alt="" />
              </div>
            ))
          ) : (
            <p>There is no data</p>
          )}
        </div>
        <div className="flex flex-col gap-4 justify-center items-center mt-6">
          <p className="text-slate-500">Did this answer this question?</p>
          <div className="flex justify-center items-center gap-4">
            {reactions.length > 0 ? (
              reactions.map((data, index) => (
                <img key={index} src={data} alt="" />
              ))
            ) : (
              <p>There is no data</p>
            )}
          </div>
          <Link
            className="flex gap-2 items-center font-medium text-base text-indigo-600"
            to="/"
          >
            Open in help center <img src={open} alt="" />
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
