import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;



//how to call this in another component
useOutsideClick(modalOut, () => setModalPopup(false));
// check *ChatBot* component below 
// modalOut is a ref name that have to use body that's outside click will work for



const ChatBot = () => {
  const [show, setShow] = useState(false);
  const chatbotRef = useRef(null);
    useOutsideClick(chatbotRef, () => setShow(false));

  return (
    <div
      ref={chatbotRef}
      className="fixed z-40 max-w-[512px] w-full  bottom-14 right-14"
    >
     <p>Write your logic for modal here!</p>
    </div>
  );
};



