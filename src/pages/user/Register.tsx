
import { useEffect, useState, type ChangeEvent } from 'react';
import { registerUser, resetStatus } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Status } from '../../globals/types/types';
import { Link, useNavigate } from 'react-router';


const RegisterForm = () => {
  const Navigate = useNavigate()
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status == Status.SUCCESS) {
      dispatch(resetStatus())
      Navigate("/login")
    }
    else if (status == Status.ERROR) {
      alert("something went wrong")
    }
  }, [status, Navigate, dispatch])


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    token: ""

  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData))
  };

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#F9FAFB]">
          Create your account
        </h2>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>



            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" required />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-[#111827] bg-[#F59E0B] hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Register
              </button>
              <div className='mt-6 text-center flex gap-2 text-gray-500 font-medium'>Already have Account.<Link to={"/login"}> <p className='text-[#111827] font-bold'>Login here</p></Link></div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
