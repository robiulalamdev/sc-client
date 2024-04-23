import { useEffect } from "react";

export function useScrollToBottom(chatBoxRef, suggestionEnabled) {
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatBoxRef, suggestionEnabled]);
}
