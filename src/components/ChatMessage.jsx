function ChatMessage({ message, sender, time }) {
  const isUser = sender === 'user-message';

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'bot-row'}`}>

      {!isUser && (
        <div className="avatar">
          🤖
        </div>
      )}

      <div className={sender}>
        <p>{message}</p>
        <small>{time}</small>
      </div>

      {isUser && (
        <div className="avatar">
          👩
        </div>
      )}

    </div>
  );
}

export default ChatMessage;