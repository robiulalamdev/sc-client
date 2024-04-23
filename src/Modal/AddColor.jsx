import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import close from "../assets/close.svg";

const AddColor = ({
  setColorModal,
  selectedColor,
  setSelectedColor,
  setBrand,
  // handleChange,
}) => {
  const colorRef = useRef();

  const [ nameColor, setNameColor ] = useState("color")
  const [ valueColor, setValueColor ] = useState(selectedColor)


  const handleChange = (e) => {
    setSelectedColor(e.target.value);


    // const { name } = e.target;
    // console.log("Name:", e.target)
    console.log("Value:", e.target.value )
    // setNameColor(name)
    setValueColor(e.target.value)
    // setBrand((prevState) => ({
    //   ...prevState,
    //   [name]: [...(prevState[name] || []), e.target.value],
    // }));
  };

  const handleSubmitColor = (e) => {
    const { name } = e.target;
    console.log("Name:", name)
    console.log("Value:", e.target.value )
    setBrand((prevState) => ({
      ...prevState,
      [nameColor]: [...(prevState[nameColor] || []), valueColor],
    }));

    setColorModal(false)
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    console.log("e.target.value: ", e.target.value)
  };

  useOutsideClick(colorRef, () => setColorModal(false));
  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={colorRef}
        className="max-w-[540px] w-full bg-white text-black p-10 rounded-2xl relative"
      >
        <button
          onClick={() => setColorModal(false)}
          className="absolute top-5 right-5 "
        >
          <img src={close} alt="" />
        </button>

        <div className="mb-5">
          <label className="block mb-2">Choose color from here</label>
          <input
            type="color"
            name="color"
            value={selectedColor}
            onChange={handleChange}
            // onChange={handleColorChange}
            className="rounded-md w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Type here</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedColor}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmitColor}
            type="button"
            className="primary_btn mt-5 "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddColor;
