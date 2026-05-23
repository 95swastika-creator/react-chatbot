//localStorage.removeItem('messages'); for clearing the chat history
import './App.css';
import TypingIndicator from './components/TypingIndicator';
import { useState, useRef, useEffect } from 'react';
import { getBotReply } from './api/gemini';

import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

function App() {
 const [messages, setMessages] = useState(() => {
  const savedMessages = localStorage.getItem('messages');

  if (savedMessages) {
    return JSON.parse(savedMessages);
  }

  return [
    {
      id: 1,
      text: 'Hello Bot!',
      sender: 'user-message',
      time: '10:00 AM'
    },
    {
      id: 2,
      text: 'Hello! How can I help you?',
      sender: 'bot-message',
      time: '10:00 AM'
    }
  ];
});

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isTyping]);
  useEffect(() => {
  localStorage.setItem(
    'messages',
    JSON.stringify(messages)
  );
}, [messages]);

  function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

 async function sendMessage(newMessage) {
  // Add user message
  setMessages(prevMessages => [
    ...prevMessages,
    {
      id: Date.now(),
      text: newMessage,
      sender: 'user-message',
      time: getCurrentTime()
    }
  ]);

  setIsTyping(true);

  try {
    const botReply = await getBotReply(newMessage);

    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot-message',
        time: getCurrentTime()
      }
    ]);
  } catch (error) {
    console.error(error);

    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong.',
        sender: 'bot-message',
        time: getCurrentTime()
      }
    ]);
  } finally {
    setIsTyping(false);
  }
}

  return (
    <div className="app">
      <div className="chat-header">
        AI Chatbot
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.text}
          sender={message.sender}
          time={message.time}
        />
      ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef}></div>
      </div>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;