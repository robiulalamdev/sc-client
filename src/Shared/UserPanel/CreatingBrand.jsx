import creating from "../../assets/new-creating.svg";

const CreatingBrand = ({ title }) => {
  return (
    <div className="text-center ">
      {" "}
      <img className="mb-6 mx-auto" src={creating} alt="" />
      <p className="text-xl font-bold">{title}</p>
    </div>
  );
};

export default CreatingBrand;
