import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const disclosureStyle = {
    background: 'linear-gradient(to right,#bbf7d0,#0e7490)', // Replace these colors with your desired gradient
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="flex min-h-screen justify-center items-center" style={disclosureStyle}>
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <img
              className="mx-auto h-10 w-auto"
              src="/ecommerce.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              Create a New Account
            </h2>
          </div>

          <form
            noValidate
            className="mt-6 space-y-4"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: 'user',
                  //TODO: this role can be directly given on backend
                })
              );
              console.log(data);
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'Invalid email',
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-300 sm:text-sm transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-300 sm:text-sm transition"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'Passwords do not match',
                  })}
                  type="password"
                  className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-300 sm:text-sm transition"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already a Member?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
