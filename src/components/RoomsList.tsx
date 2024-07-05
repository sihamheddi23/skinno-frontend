import React from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

function RoomsList() {
    // get params of url
    const param = useParams();
  return (
    <div className="col-span-1 border-r border-gray-300">
      <button className="flex gap-1 items-center">
        <IoAdd /> New Chat
      </button>
      <div className="text-gray-700 my-4 flex flex-col ">
        <Link to={"/assisstant/chat/1"} className={param.roomId && param.roomId === "1" ? "mb-2  mx-4 p-2 bg-gray-200" : "mb-2  mx-4 p-2"}>
          Topic 1
        </Link>
        <Link to={"/assisstant/chat/2"} className={param.roomId && param.roomId === "2" ? "mb-2  mx-4 p-2 bg-gray-200" : "mb-2  mx-4 p-2"}>Topic 2</Link>
        <Link to={"/assisstant/chat/3"} className={param.roomId && param.roomId === "3" ? "mb-2  mx-4 p-2 bg-gray-200" : "mb-2  mx-4 p-2"}>Topic 3</Link>
        <Link to={"/assisstant/chat/4"} className={param.roomId && param.roomId === "4" ? "mb-2  mx-4 p-2 bg-gray-200" : "mb-2  mx-4 p-2"}>Topic 4</Link>
      </div>
    </div>
  );
}

export default RoomsList;
