import { MouseEvent, useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../api/axiosConfig";
import { useAppSelector } from "../store";
import { alertError, alertSuccess } from "../utils/toasts";
import { MdDelete } from "react-icons/md";

function RoomsList() {
  const param = useParams();
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);
  const [rooms, setrooms] = useState([]);
  const [showCreateInput, setshowCreateInput] = useState(false);
  const roomTitleInputeRef = useRef<HTMLInputElement>();

  useEffect(() => {
    fetch(BASE_URL + "/rooms/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setrooms(res);
      })
      .catch((err) => {
        console.log(err);
        alertError(
          "Something went wrong to the server. Please try again later"
        );
      });
  }, []);

  const createNewRoom = () => {
    const title = roomTitleInputeRef.current.value;
    if (title.trim() === "") {
      alertError("Please enter the name of topic");
    }

    fetch(BASE_URL + "/rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.user.token}`,
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((res) => {
        setrooms([...rooms, res]);
        setshowCreateInput(false);
        navigate(`/assisstant/chat/${res.slug}`);
      })
      .catch((err) => {
        console.log(err);
        alertError(
          "Something went wrong to the server. Please try again later"
        );
      });
  };

  const deleteRoom = (e: MouseEvent, slug: string) => {
    e.stopPropagation();
    fetch(BASE_URL + "/rooms/" + slug, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setrooms(rooms.filter((room) => room.slug !== slug));
        alertSuccess("Room deleted successfully");
        navigate("/assisstant/welcome");
      })
      .catch((err) => {
        console.log(err);
        alertError(
          "Something went wrong to the server. Please try again later"
        );
      });
  };

  return (
    <div className="w-full md:col-span-1  md:w-auto md:border-r md:border-gray-300">
      {showCreateInput ? (
        <div className="flex gap-1 items-center">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-2 py-1"
            name="title"
            ref={roomTitleInputeRef}
            placeholder="Enter name of the topic"
          />
          <div className="flex gap-1 mr-1">
            <button
              className="flex gap-1 items-center bg-blue-700 text-white p-1 rounded"
              onClick={createNewRoom}
            >
              save
            </button>
            <button
              className="flex gap-1 items-center bg-red-500 text-white p-1 rounded"
              onClick={() => setshowCreateInput(false)}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex gap-1 items-center"
          onClick={() => setshowCreateInput(true)}
        >
          <IoAdd /> New Chat
        </button>
      )}

      <div className="text-gray-700 my-4 flex flex-col max-h-[140px] overflow-y-auto md:max-h-[90%]">
        {rooms.length > 0 &&
          rooms?.map((room, index) => (
            <div
              key={index}
              className={
                param.slug && param.slug === room.slug
                  ? "flex gap-1 justify-between mb-2  mx-4 p-2 bg-gray-200"
                  : "mx-4 p-2 flex gap-1 justify-between mb-2 "
              }
            >
              <Link to={`/assisstant/chat/${room.slug}`}>{room.title}</Link>
              <button
                className="text-violet-500"
                onClick={(e) => deleteRoom(e, room.slug)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RoomsList;
