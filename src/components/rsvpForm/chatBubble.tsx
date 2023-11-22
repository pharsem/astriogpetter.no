import React from "react";

interface ChatBubbleProps {
  text: string;
  systemMessage: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, systemMessage }) => {
    const bubbleClass = systemMessage
        ? "alert-primary offset-md-4"
        : "alert-secondary";

    return (
        <div
            className={`p-4 rounded text-start col-8 alert ${bubbleClass}`}
            dangerouslySetInnerHTML={{ __html: text }}
        ></div>
    );
};

export default ChatBubble;
