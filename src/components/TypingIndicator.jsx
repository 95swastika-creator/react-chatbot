function TypingIndicator() {
  return (
    <div className="message-row bot-row">

      <div className="avatar">
        🤖
      </div>

      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}

export default TypingIndicator;