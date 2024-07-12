import { CiDark, CiLight } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../store";

function ModeButton() {
  const themeState = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const changeTheme = () => {
    dispatch({ type: "theme/toggleTheme" });
  }
  return (
    <button className="flex flex-col items-center gap-2" onClick={changeTheme}>
      <p className="text-xs font-bold capitalize">{themeState.theme} Mode</p>
      <div
        className={
          themeState.theme === "light"
            ? "bg-gray-200  p-1 w-20  rounded-full"
            : "bg-violet-400  flex justify-end p-1 w-20  rounded-full"
        }
      >
        <div
          className={
            themeState.theme === "light"
              ? " bg-white w-5 flex justify-center rounded-full"
              : "bg-gray-800 w-5 flex justify-center rounded-full"
          }
        >
          {themeState.theme === "light" ? <CiLight /> : <CiDark />}
        </div>
      </div>
    </button>
  );
}

export default ModeButton;
