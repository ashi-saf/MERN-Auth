import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import AppContext from '../context/AppContext';

const UserDetails = () => {
  const { backendUrl } = useContext(AppContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/user');

        data.success ? setUserData(data.users) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getUserData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(backendUrl + `/api/user/${id}`);
      setUserData(userData.filter((user) => user._id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="overflow-x-auto w-full max-w-[90vw] md:max-w-[50rem] lg:max-w-3/4 mx-auto p-4">
        <h2 className="font-bold text-lg text-center py-3">User Details</h2>
        <table className="min-w-full border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData && userData.length > 0 ? (
              userData.map((data, index) => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
