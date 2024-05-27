import React, { useState } from "react";
import Navbar from "../components/generics/Header";
import Footer from "../components/Footer";
import { IoAdd, IoMicOutline, IoSend } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import { HiSpeakerWave } from "react-icons/hi2";

const AIChatPage = () => {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };

    // For demonstration, we'll add a bot response here.
    // You can replace this with an API call to your AI backend.
    const botResponse = {
      sender: "bot",
      text: "Hello! How can I assist you today?",
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage, botResponse]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
          <div className="m-5 bg-white p-6 rounded-lg shadow-lg h-[90%] grid grid-cols-4 gap-2">
        <div className="col-span-1 border-r border-gray-300">
          <button className="flex gap-1 items-center"><IoAdd /> New Chat</button>
          <ul className="text-gray-700 my-4">
            <li className="mb-2 bg-gray-200 mx-4 p-2 rounded font-semibold">Topic 1</li>
            <li className="mb-2  mx-4 p-2">Topic 2</li>
            <li className="mb-2  mx-4 p-2">Topic 3</li>
            <li className="mb-2 mx-4 p-2">Topic 4</li>
          </ul>
        </div>
        <div className="col-span-3 m-8">
          <h2 className="text-2xl font-bold mb-4">Chat with AI Assistant</h2>
          <div className="bg-gray-200 p-4 rounded-lg mb-4 h-[85%] overflow-y-scroll">
            {messages.map((message: any, index: number) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-violet-900 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {message.sender === "user" ? (
                    <p> <span className="font-bold">You</span> : {message.text} </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p><span className="font-bold">Bot : </span> {message.text}</p>
                      <button>
                        <HiSpeakerWave />
                      </button>
                    </div>
                  )}
                  <small className="block mt-1 text-xs">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-grow p-2 border border-gray-300 rounded-lg outline-none"
              placeholder="Type your message..."
            />
            <button className="font-bold border border-black py-2 px-4 rounded-lg">
              <RiImageAddLine />
            </button>
            <button className="font-bold border border-black py-2 px-4 rounded-lg">
              <IoMicOutline />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-black text-white font-bold py-2 px-4 rounded-r-lg"
            >
              <IoSend />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIChatPage;
