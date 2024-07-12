import React, { useEffect, useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMicOutline, IoSend } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store";

type ChatWithBotInputProps = {
  socket: any;
};

const ChatWithBot: React.FC<ChatWithBotInputProps> = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userState = useAppSelector((state) => state.user);
  const param = useParams();

  useEffect(() => {
    socket.emit("join_room", {
      roomId: param.slug,
      token: userState.user.token,
    });
    socket.on("get_messages_" + param.slug, (data: any) => {
      console.log("dododod");

      setMessages(data);
    });
     socket.on("receive_message_" + param.slug, (data: any) => {
        console.log(data);

        setMessages((prevMessages) => [...prevMessages, data]);
        setInput("");
     });
    return () => {
      socket.off("get_messages_" + param.slug);
      socket.off("receive_message_" + param.slug);
    }
  }, [param.slug]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      senderType: "user",
      content: input,
      sentAt: new Date(),
    };

    setMessages([...messages, newMessage]);
    socket.emit("send_message", { content: input, roomId: param.slug });
 };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="m-2 md:col-span-3 md:m-8">
      <h2 className="text-2xl font-bold mb-4">Chat with AI Assistant</h2>
      <div className="bg-gray-200 p-4 rounded-lg mb-4 h-[700px] md:h-[900px] lg:h-[700px] overflow-y-scroll">
        {messages.map((message: any, index: number) => (
          <div
            key={index}
            className={`mb-4 ${
              message.senderType === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.senderType === "user"
                  ? "bg-violet-900 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.senderType === "user" ? (
                <p>
                  {" "}
                  <span className="font-bold">You</span> : {message.content}{" "}
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <p>
                    <span className="font-bold">Bot : </span> {message.content}
                  </p>
                  <button>
                    <HiSpeakerWave />
                  </button>
                </div>
              )}
              <small className="block mt-1 text-xs">
                {new Date(+message.sentAt).toUTCString()}
              </small>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
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
  );
};

export default ChatWithBot;
