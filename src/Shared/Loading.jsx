import spinner from "../assets/spinner.svg";

const Loading = () => {
  return (
    <div className=" w-full h-full flex items-center justify-center p-5">
      <img className="w-[80px]" src={spinner} alt="" />
    </div>
  );
};

export default Loading;
