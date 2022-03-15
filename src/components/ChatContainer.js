import "../styles/ChatContainer.css";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = () => {
  return (
    <div className="chat-container">
      <ChatHeader />

      <button className="option-button">Matches</button>
      <button className="option-button">Chat</button>

      <MatchesDisplay />
      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
