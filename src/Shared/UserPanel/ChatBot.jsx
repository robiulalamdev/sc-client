import { useEffect, useRef, useState } from "react";
import active from "../../assets/active.svg";
import profile from "../../assets/chatbot.svg";
import chatOff from "../../assets/chatOff.svg";
import close from "../../assets/close.svg";
import chatBot from "../../assets/noChat.svg";
import {
  chatHistory,
  getFormattedDate,
  suggestionData,
} from "../../utils/chat";
import { useScrollToBottom } from "../../utils/useScrollToBottom";
import { ArrowUp } from "@phosphor-icons/react";
import {
  useAddAutoReplyMutation,
  useAddMessageMutation,
  useGetUserContactMessageQuery,
} from "../../features/contactUs/contactUsApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { convetChatDateTime } from "../../utils/converter";

const ChatBotV2 = () => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { user } = useSelector((state) => state.auth);
  const [addMessage, { isLoading: sendingMessage }] = useAddMessageMutation();
  const [addAutoReply, { isLoading: autoRepling }] = useAddAutoReplyMutation();

  const { data, isLoading } = useGetUserContactMessageQuery();

  const [suggestionEnabled, setSuggestionEnabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const message = form.message.value;

    const formData = data
      ? {
          message,
          contactId: data?._id,
        }
      : { message };

    try {
      const res = await addMessage(formData);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const handleAutoReplyMessageSend = async (title) => {
    const formData = data
      ? {
          message: title,
          contactId: data?._id,
        }
      : { message: title };

    try {
      const res = await addMessage(formData);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        await handleAutoReply(title);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const handleAutoReply = async (title) => {
    const formData = data
      ? {
          messageType: title,
          contactId: data?._id,
        }
      : {
          messageType: title,
        };
    try {
      const res = await addAutoReply(formData);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        // form.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data, show, autoRepling]);

  return (
    <div
      className="fixed z-40 max-w-[512px] w-full  bottom-32 right-14"
      ref={chatbotRef}
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
            {data && data?.messages.length === 0 && (
              <>
                <p className="text-2xl font-bold ">
                  How can we
                  <span className="text-indigo-600"> help you today?</span>
                </p>
                <div className="text-center my-10">
                  <img className="mb-6 mx-auto" src={chatBot} alt="" />
                  <p className="text-xl font-semibold text-slate-700">
                    No History
                  </p>
                </div>
              </>
            )}

            <div
              className={`${
                suggestionEnabled ? "max-h-[300px]" : "max-h-[420px]"
              } chat-box overflow-y-auto no_scrollbar`}
            >
              {data &&
                data?.messages.length > 0 &&
                data?.messages?.map((item, index) => (
                  <div
                    key={index}
                    className={`mb-6 flex ${
                      item.sender._id === user._id
                        ? "justify-end pr-2 [&>div>div]:float-right [&>div>div]:clear-both [&>div>.date]:text-right "
                        : "justify-start"
                    }`}
                  >
                    <div className={`max-w-[350px]`}>
                      <div
                        className={`px-4 py-2 text-sm border rounded-xl inline-block mb-[10px]`}
                      >
                        {item.message}
                      </div>

                      <div className="date text-xs text-[#64748B]">
                        {convetChatDateTime(item.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              {autoRepling && (
                <div className=" flex justify-start">
                  <div className={`max-w-[350px]`}>
                    <div
                      className={`px-4 py-2 text-sm border rounded-xl inline-block mb-[10px]`}
                    >
                      <p>loading...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {suggestionEnabled && (
              <div
                className="pt-1"
                style={{ boxShadow: "0 -5px 20px -12px rgba(0, 0, 0, 0.05)" }}
              >
                <p className="text-xs font-semibold mb-3">SUGGESTIONS</p>
                <div className="flex items-center flex-wrap gap-3">
                  {suggestionData.map((i, index) => (
                    <button
                      className="bg-indigo-100 py-2 px-4 rounded-xl text-sm font-normal"
                      onClick={() => handleAutoReplyMessageSend(i.title)}
                      key={index}
                    >
                      {i.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="chatbot_input_box pt-0 p-8">
            <form
              onSubmit={handleSubmit}
              className=" flex items-center gap-2 border rounded-full py-2 pr-2 pl-4"
            >
              <input
                className="w-full"
                name="message"
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Write your message"
                required
              />
              <button
                disabled={!inputValue || sendingMessage || autoRepling}
                className={`flex-shrink-0 w-10 h-10 bg-indigo-600 disabled:bg-slate-300 rounded-full flex items-center justify-center text-white`}
                type="submit"
              >
                <ArrowUp size={20} weight="bold" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        className="fixed z-40 bottom-14 right-14 hover:scale-105 transition-all duration-300 ease-in "
        onClick={() => setShow(!show)}
      >
        <img src={show ? chatOff : profile} alt="" />
      </button>
    </div>
  );
};

export default ChatBotV2;
