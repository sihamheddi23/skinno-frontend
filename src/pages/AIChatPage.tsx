import React, { useEffect, useState } from "react";
import Navbar from "../components/generics/Header";
import Footer from "../components/Footer";
import RoomsList from "../components/RoomsList";
import ChatWithBot from "../components/ChatWithBot";
import { io } from "socket.io-client";

const AIChatPage = () => {
  const socket = io("http://localhost:3000");

  return (
    <div className="bg-gray-100 max-h-[150vh] lg:max-h-[1000px] md:h-[1350px] w-[100%]">
      <Navbar />
          <div className="m-2 md:m-5 bg-white p-2 md:p-6 rounded-lg shadow-lg h-[95%] md:h-[90%] grid grid-cols-1 md:grid-cols-4 gap-2">
          <RoomsList />
          <ChatWithBot socket={socket} />
      </div>
      <Footer />
    </div>
  );
};

export default AIChatPage;
