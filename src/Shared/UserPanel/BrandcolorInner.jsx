import close from "../../assets/close.svg";
import mp4 from "../../assets/mp4.svg";
import mp3 from "../../assets/audio.svg";

const BrandcolorInner = ({ brand, main, data, setMain,index }) => {
  console.log(data);
  // const fileName = data?.name.split(".")[0];
  // const fileExtension = data?.name.split(".").slice(1).join(".");
  // const truncatedFileName =
  //   fileName.length > 10 ? fileName.slice(0, 10) : fileName;

  const removeHandler = () => {

    console.log("main", main)
    console.log("main.guidelines", main)
    console.log("data", data)
    console.log("data index", index)
    console.log("data indexbrand ", brand)

    // Filter out the data to be removed from the main array
    const updatedMain = main.filter((item) => item !== data);
    console.log("updatedMain", updatedMain);
    // setMain(updatedMain)

    // setMain(prevArray => {
    //   // Copying the previous array
    //   const newArray = [...main];

    //   // Updating the guidelines key with new array
    //   newArray[0].index = updatedMain;

    //   return newArray;
    // });

    setMain(prevState => ({
      ...prevState,
      [index]: updatedMain
  }));

  };
  return (
    <div className="border rounded-xl relative">
      <span onClick={removeHandler} className="absolute top-1 right-1">
        <img src={close} alt="" />
      </span>
      <div className={` ${data} h-[90px] flex justify-center rounded-t-xl`} style={{backgroundColor: `${data}`}}>
       
        {/* {fileExtension.toLowerCase() === "pdf" ? (
          <img
            className="object-cover"
            src="https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_1280.png"
            alt=""
          />
        ) : fileExtension.toLowerCase() === "mp4" ||
          fileExtension.toLowerCase() === "wmv" ||
          fileExtension.toLowerCase() === "mov" ? (
          <img className="object-cover" src={mp4} alt="" />
        ) : fileExtension.toLowerCase() === "mp3" ||
          fileExtension.toLowerCase() === "wav" ? (
          <img className="object-cover" src={mp3} alt="" />
        ) : (
          <img
            className="object-cover"
            src={URL.createObjectURL(data)}
            alt=""
          />
        )} */}
      </div>
      <div className="py-2 px-3">
       {data}
      </div>
    </div>
  );
};

export default BrandcolorInner;
