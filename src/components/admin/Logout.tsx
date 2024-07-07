import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/reducers/userSlice";
import { alertSuccess } from "../../utils/toasts";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    loadingUser: loading,
    user: { token },
  } = useAppSelector((state) => state.user);
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
    <button
      className={"bg-violet-950 text-white px-4 py-2 rounded"}
      onClick={logout}
    >
      {loading ? <span>Logging out...</span> : <span>Logout</span>}
    </button>
  );
}

export default Logout;
