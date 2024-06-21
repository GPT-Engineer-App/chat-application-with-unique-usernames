"use client";

import React, { useState, useEffect, useRef } from "react";
import "./globals.css";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
    playNotificationSound();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
      }, 1000)
    );
  };

  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("User logged out");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <h1 className="text-xl">Chat Application</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white p-4 rounded shadow">
              <p>{message.text}</p>
              <span className="text-gray-500 text-sm">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </main>
      <footer className="p-4 bg-white flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
      {isTyping && <div className="p-4 text-gray-500">User is typing...</div>}
    </div>
  );
};

export default Home;