import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const displayMessage = (content, type) => {
    setMessages((prev) => [...prev, { content, type }]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    displayMessage(input, 'user');
    const userMessage = input;
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      displayMessage(data.reply, 'bot');
    } catch (error) {
      console.error('Error:', error);
      displayMessage('Failed to communicate with the chatbot.', 'bot');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <img
        id="chat-toggle-icon"
        src="https://i.pinimg.com/736x/95/fc/8d/95fc8d7b32b3f0b35c774d8b13577599.jpg"
        alt="Chat Icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 140,
          height: 140,
          cursor: 'pointer',
          zIndex: 1001,
        }}
      />
      {isOpen && (
        <div
          id="chat-container"
          style={{
            maxWidth: 600,
            margin: '100px auto',
            padding: '1.5em',
            border: '2px solid #4CAF50',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #e0f7fa, #a7ffeb)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#004d40',
            position: 'fixed',
            bottom: 80,
            right: 20,
            zIndex: 1000,
          }}
        >
          <div
            id="chat-box"
            ref={chatBoxRef}
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              padding: 10,
              borderBottom: '1px solid #004d40',
              marginBottom: 10,
              backgroundColor: '#ffffffcc',
              borderRadius: 8,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.type}`}
                style={{
                  padding: 10,
                  margin: '8px 0',
                  borderRadius: 8,
                  fontSize: '1rem',
                  lineHeight: 1.4,
                  textAlign: msg.type === 'user' ? 'right' : 'left',
                  backgroundColor: msg.type === 'user' ? '#b2dfdb' : '#80cbc4',
                  color: msg.type === 'user' ? '#004d40' : '#00251a',
                  fontWeight: 600,
                }}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <input
            id="message-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: 'calc(100% - 80px)',
              padding: 12,
              border: '1px solid #004d40',
              borderRadius: 8,
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <button
            id="send-button"
            onClick={sendMessage}
            style={{
              padding: '12px 20px',
              backgroundColor: '#004d40',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              marginLeft: 8,
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00796b')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#004d40')}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default Chatbot;
