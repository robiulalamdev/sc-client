import profile from "../../assets/chatbot.svg";
import chatOff from "../../assets/chatOff.svg";
import close from "../../assets/close.svg";
import active from "../../assets/active.svg";
import send from "../../assets/send.svg";
import chatBot from "../../assets/noChat.svg";
import { useEffect, useRef, useState } from "react";
import { quickOptions } from "../../utils/data";
import useOutsideClick from "../../hooks/useOutsideClick";

const ChatBot = () => {
  const [show, setShow] = useState(false);
  const chatbotRef = useRef(null);
  useOutsideClick(chatbotRef, () => setShow(false));

  return (
    <div
      ref={chatbotRef}
      className="fixed z-40 max-w-[512px] w-full  bottom-14 right-14"
    >
      {show && (
        <div className="rounded-3xl bg-white shadow-2xl max-h-[672px]  h-full ">
          <div className="chatbot_header border-b p-6 w-full flex gap-2 items-start justify-between">
            <div className="flex items-center gap-3">
              <img src={profile} alt="" />
              <div>
                <p className=" text-xl font-bold mb-1">SoCreative Bot</p>
                <div className="flex items-center gap-1">
                  <img src={active} alt="" />
                  <p className="text-slate-500 text-sm font-medium">
                    Active Now
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => setShow(false)}>
              <img src={close} alt="" />
            </button>
          </div>
          <div className="chatbot_body overflow-y-auto no_scrollbar p-8">
            <p className="text-2xl font-bold ">
              How can we
              <span className="text-indigo-600"> help you today?</span>
            </p>
            <div className="text-center my-10">
              <img className="mb-6 mx-auto" src={chatBot} alt="" />
              <p className="text-xl font-semibold text-slate-700">No History</p>
            </div>

            <div>
              <p className="text-xs font-semibold mb-3">SUGGESTIONS</p>
              <div className="flex items-center flex-wrap gap-3">
                {quickOptions.length > 0 ? (
                  quickOptions.map((data, index) => (
                    <button
                      className="bg-indigo-100 py-2 px-4 rounded-xl text-sm font-normal"
                      key={index}
                    >
                      {data}
                    </button>
                  ))
                ) : (
                  <p>There is no data</p>
                )}
              </div>
            </div>
          </div>
          <div className="chatbot_input_box pt-0 p-8">
            <div className=" flex items-center gap-2 border rounded-full py-2 pr-2 pl-4">
              <input
                className="w-full"
                type="text"
                placeholder="Write your message"
              />
              <button>
                <img src={send} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-end mt-4">
        <button
          className="hover:scale-105 transition-all duration-300 ease-in"
          onClick={() => setShow(!show)}
        >
          <img src={show ? chatOff : profile} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
