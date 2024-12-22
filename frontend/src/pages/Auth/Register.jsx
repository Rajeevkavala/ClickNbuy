import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-hot-toast"; 

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/home";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="bg-[#000] h-[100vh] flex items-center justify-center">
      <div className="flex flex-wrap w-full max-w-screen-xl">
        {/* Left Image for larger screens */}
        <div className="hidden lg:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80"
            alt="Register"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 px-6 py-12 flex flex-col justify-center">

          <form onSubmit={submitHandler} className="max-w-sm w-full mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>
            <div className="my-[2rem]">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full bg-[#181a1b] text-white"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full bg-[#181a1b] text-white"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full bg-[#181a1b] text-white"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full bg-[#181a1b] text-white"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] w-full"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4 text-center">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
