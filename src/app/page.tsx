"use client";

import React, { useState, useEffect } from "react";

const users = [
  "John", "Josh", "Joy", "Joe", "Jole", "Joff", "Joke", "Jote", "Jolly", "Joi"
];

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);

  const handleLogin = () => {
    if (users.includes(username) && password === "password") {
      setLoggedInUser(username);
      setOnlineUsers((prev) => [...prev, username]);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setOnlineUsers((prev) => prev.filter((user) => user !== loggedInUser));
    setLoggedInUser(null);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, { from: loggedInUser!, text: message }]);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (loggedInUser) {
        setOnlineUsers((prev) => prev.filter((user) => user !== loggedInUser));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loggedInUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!loggedInUser ? (
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl mb-4">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl mb-4">Welcome, {loggedInUser}</h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded mb-4"
          >
            Logout
          </button>
          <div className="mb-4">
            <h3 className="text-xl mb-2">Online Users</h3>
            <ul>
              {users.map((user) => (
                <li key={user} className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      onlineUsers.includes(user) ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {user}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl mb-2">Messages</h3>
            <div className="border p-2 h-40 overflow-y-scroll">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.from}: </strong>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;