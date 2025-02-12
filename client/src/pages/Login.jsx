import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AppContext from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContext);
  const [state, setState] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateErrors = (values) => {
    const result = {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (state === 'signup' && !values.name) {
      result.name = 'Name is required';
    }
    if (!values.email) {
      result.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      result.email = 'Invalid email format';
    }
    if (!values.password) {
      result.password = 'Password is required';
    } else if (values.password.length < 8) {
      result.password = 'Password should be at least 8 characters long.';
    } else if (!passwordRegex.test(values.password)) {
      result.password =
        'Password should contain an uppercase,lowercase,digit and special charecter charecter';
    }
    return result;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Validate form data
      const validationErrors = validateErrors({ name, email, password });
      setErrors(validationErrors);
      // Stop form submission if there are validation errors
      if (Object.keys(validationErrors).length > 0) return;
      axios.defaults.withCredentials = true;
      if (state === 'signup') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          navigate('/user');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          navigate('/user');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'signup' ? 'Create account' : 'Login'}
        </h2>
        <p className="text-sm mb-6 text-center">
          {state === 'signup'
            ? 'Create your account'
            : 'Login to your account!'}
        </p>
        <form onSubmit={handleSubmit}>
          {state === 'signup' && (
            <div className="mb-4 flex items-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="person icon" />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          {state === 'signup' && (
            <div className="text-red-500 text-center">
              <p>{errors.name}</p>
            </div>
          )}
          <div className="mb-4 flex items-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#333A5C] mt-2">
            <img src={assets.mail_icon} alt="mail icon" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-red-500 text-center">
            <p>{errors.email}</p>
          </div>
          <div className="mb-4 flex items-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#333A5C] mt-2">
            <img src={assets.lock_icon} alt="person icon" />

            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-red-500 text-center">
            <p>{errors.password}</p>
          </div>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white">
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
        {state === 'signup' && (
          <p className="text-center text-sm mt-4 text-gray-400">
            Already have an account?{' '}
            <span
              onClick={() => setState('login')}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        )}
        {state === 'login' && (
          <p className="text-center text-sm mt-4 text-gray-400">
            Don&apos;t have an account?{'  '}
            <span
              onClick={() => setState('signup')}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
