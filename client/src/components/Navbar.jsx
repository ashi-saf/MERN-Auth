import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, backendUrl } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success('Logged out successfully!');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        src="logo.svg"
        alt="logo image"
        className="w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate('/')}
      />
      {isLoggedIn ? (
        <button
          className="flex items-center gap-2 border border-red-500 text-gray-500 rounded-full px-6 py-2 hover:bg-red-100  transition-all"
          onClick={handleLogout}
        >
          Logout
          <img src="arrow_icon.svg" alt="arrow icon" />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 border border-gray-400 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          onClick={() => navigate('/login')}
        >
          Login
          <img src="arrow_icon.svg" alt="arrow icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
