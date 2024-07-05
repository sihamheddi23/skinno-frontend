import React, { useState } from "react";
import Navbar from "../components/generics/Header";
import Footer from "../components/Footer";
import RoomsList from "../components/RoomsList";
import ChatWithBot from "../components/ChatWithBot";

const AIChatPage = () => {

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
          <div className="m-5 bg-white p-6 rounded-lg shadow-lg h-[90%] grid grid-cols-4 gap-2">
          <RoomsList />
          <ChatWithBot />
      </div>
      <Footer />
    </div>
  );
};

export default AIChatPage;
