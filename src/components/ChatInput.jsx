import { useState } from 'react';

function ChatInput({ sendMessage }) {
  const [inputText, setInputText] = useState('');

  function handleSend() {
    if (!inputText.trim()) {
      return;
    }

    sendMessage(inputText);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSend();
          }
        }}
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;