import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if password is provided and match with confirmPassword
    if (password || confirmPassword) {
      if (!password || !confirmPassword) {
        toast.error("Please fill in both password fields.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Check password length
      if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
      }
    }

    try {
      // If no password is provided, exclude it from the request
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password: password || undefined, // Don't send password if not updated
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");

      // Optionally reset password fields after successful update
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-white">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full bg-[#181a1b] text-white"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                aria-label="Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full bg-[#181a1b] text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email Address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full bg-[#181a1b] text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                required="true"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full bg-[#181a1b] text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirm Password"
                required="true"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>

            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
