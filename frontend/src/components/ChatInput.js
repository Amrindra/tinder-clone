import { useState } from "react";
import "../styles/ChatInput.css";

const ChatInput = () => {
  const [textArea, setTextArea] = useState("");

  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />

      <button className="secondary-button">Submit</button>
    </div>
  );
};

export default ChatInput;
