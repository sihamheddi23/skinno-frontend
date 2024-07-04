import { useAppDispatch, useAppSelector } from "../../store";
import { logoutUser } from "../../store/reducers/userSlice";
import { alertSuccess } from "../../utils/toasts";
import { useNavigate } from "react-router-dom";
import ModeButton from "../generics/ModeButton";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    loadingUser: loading ,
    user: { token },
  } = useAppSelector((state) => state.user);
  const themeState = useAppSelector((state) => state.theme);

  const logout = () => {
    dispatch(logoutUser(token)).then((result: any) => {
      if (!result.error) {
        alertSuccess("You have been logged out successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    });
  };

  return (
    <header
      className={
        themeState.theme === "light"
          ? "bg-white shadow p-4 flex justify-between items-center"
          : "bg-gray-800 border-b border-gray-600 p-4 flex justify-between items-center text-white"
      }
    >
      <div className="text-lg font-bold">Dashboard</div>
      <div className="flex items-center gap-3">
        <ModeButton />
        <button
          className={"bg-violet-950 text-white px-4 py-2 rounded"}
          onClick={logout}
        >
          {loading ? <span>Logging out...</span> : <span>Logout</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
