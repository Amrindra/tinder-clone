import "../styles/ChatHeader.css";

const ChatHeader = () => {
  return (
    <div className="chat-header-container">
      <div className="profile">
        <div className="img-container">
          <img src="" alt="" />
        </div>
        <h3>UserName</h3>
      </div>

      <i className="logout-icon">Logout</i>
    </div>
  );
};

export default ChatHeader;
