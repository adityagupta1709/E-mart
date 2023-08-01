import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
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
      <div>
      <div>
        {user && <Navigate to="/" replace={true} />}
        <div className="flex min-h-screen justify-center items-center bg-gray-100"style={disclosureStyle}>
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <img
                className="mx-auto h-10 w-auto"
                src="/ecommerce.png"
                alt="Your Company"
              />
              <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                Log in to your account
              </h2>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                );
              })}
              className="mt-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'Email not valid',
                      },
                    })}
                    type="email"
                    className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
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
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    type="password"
                    className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                {error && <p className="text-red-500">{error || error.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
