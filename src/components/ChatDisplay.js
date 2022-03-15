import "../styles/ChatDisplay.css";
import ChatInput from "./ChatInput";
import Chat from "./Chat";

const ChatDisplay = () => {
  return (
    <div className="chat-display">
      <Chat />
      <ChatInput />
    </div>
  );
};

export default ChatDisplay;
