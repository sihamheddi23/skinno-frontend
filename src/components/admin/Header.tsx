import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../store/reducers/userSlice';
import { alertSuccess } from '../../utils/toasts';
import { useNavigate } from 'react-router-dom';
import ModeButton from '../generics/ModeButton';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, user: { token } } = useAppSelector((state) => state.user);

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
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Dashboard</div>
      <div className='flex items-center gap-3'>
        <ModeButton />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={logout}>
          {loading? <span>Logging out...</span> : <span>Logout</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
