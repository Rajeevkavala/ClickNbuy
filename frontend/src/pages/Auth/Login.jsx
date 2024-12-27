import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Logged In Successfully");
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-[#000] h-screen flex items-center justify-center">
      <section className="flex flex-wrap w-full max-w-screen-xl">
        {/* Left Side Image */}
        <div className="hidden lg:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80"
            alt="Login"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 px-6 py-12 flex flex-col justify-center">
          <form
            onSubmit={submitHandler}
            className="max-w-sm w-full mx-auto bg-[#181a1b] p-6 rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-semibold mb-4 text-white text-center">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-400 mb-8 text-center">
              Sign in to your account to continue.
            </p>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
                aria-label="Email Address"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-3 border rounded w-full bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
                aria-label="Password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-3 border rounded w-full bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`bg-pink-500 text-white px-4 py-3 rounded-md w-full hover:bg-pink-600 transition-all duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400">
              New to the platform?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
