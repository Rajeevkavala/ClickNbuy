import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineDashboard,
  AiOutlineTags,
  AiOutlineAppstoreAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false); // For desktop hover effect
  const [showMobileMenu, setShowMobileMenu] = useState(false); // For mobile menu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged Out...");
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  // Close mobile menu after clicking a link
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Hamburger Button for Smaller Devices with Animation */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-full text-white transition-transform duration-500 ease-in-out transform"
        onClick={() => setShowMobileMenu((prev) => !prev)}
      >
        {showMobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Menu with Acrylic Background */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 backdrop-blur-md text-white p-4 z-40 transition-transform duration-300 transform ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-8 text-2xl text-center overflow-y-auto max-h-full">
          {/* Links */}
          <Link
            to="/home"
            onClick={closeMobileMenu}
            className="flex items-center justify-center hover:bg-blue-500 py-2 rounded-lg"
          >
            <AiOutlineHome size={26} />
            <span className="ml-2">HOME</span>
          </Link>
          <Link
            to="/shop"
            onClick={closeMobileMenu}
            className="flex items-center justify-center hover:bg-blue-500 py-2 rounded-lg"
          >
            <AiOutlineShopping size={26} />
            <span className="ml-2">SHOP</span>
          </Link>
          <Link
            to="/cart"
            onClick={closeMobileMenu}
            className="flex items-center justify-center hover:bg-blue-500 py-2 rounded-lg"
          >
            <AiOutlineShoppingCart size={26} />
            <span className="ml-2">CART</span>
          </Link>
          <Link
            to="/favorite"
            onClick={closeMobileMenu}
            className="flex items-center justify-center hover:bg-blue-500 py-2 rounded-lg"
          >
            <FaHeart size={20} />
            <span className="ml-2">FAVORITES</span>
          </Link>

          {/* User Info for Mobile */}
          {userInfo ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center items-center">
                <span className="text-3xl underline font-semibold capitalize">
                  {userInfo.username}
                </span>
              </div>

              {/* Admin Links */}
              {userInfo.isAdmin && (
                <div className="space-y-4">
                  <Link
                    to="/admin/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center py-2 px-4 hover:bg-blue-500 transition-colors"
                  >
                    <AiOutlineDashboard size={26} />
                    <span className="ml-2">Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/productlist"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center py-2 px-4 hover:bg-blue-500 transition-colors"
                  >
                    <AiOutlineShoppingCart size={26} />
                    <span className="ml-2">Products</span>
                  </Link>
                  <Link
                    to="/admin/categorylist"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center py-2 px-4 hover:bg-blue-500 transition-colors"
                  >
                    <AiOutlineTags size={26} />
                    <span className="ml-2">Category</span>
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center py-2 px-4 hover:bg-blue-500 transition-colors"
                  >
                    <AiOutlineAppstoreAdd size={26} />
                    <span className="ml-2">Orders</span>
                  </Link>
                  <Link
                    to="/admin/userlist"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center py-2 px-4 hover:bg-blue-500 transition-colors"
                  >
                    <AiOutlineUser size={26} />
                    <span className="ml-2">Users</span>
                  </Link>
                </div>
              )}

              {/* Profile link */}
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex items-center justify-center py-2 px-4 hover:bg-blue-500 transition-colors"
              >
                <AiOutlineUser size={26} />
                <span className="ml-2">Profile</span>
              </Link>

              {/* Logout button */}
              <button
                onClick={logoutHandler}
                className="flex items-center justify-center py-2 px-4 bg-red-500 hover:bg-red-700 w-full text-left border-t-2 border-gray-500 transition-colors"
              >
                <FiLogOut size={26} />
                <span className="ml-2 bg-red">Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex justify-center items-center py-2 hover:bg-blue-500 text-center"
              >
                <AiOutlineLogin size={26} />
                <span className="ml-4">LOGIN</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="flex justify-center items-center py-2 hover:bg-blue-500 text-center"
              >
                <AiOutlineUserAdd size={26} />
                <span className="ml-4">REGISTER</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar with User Info */}
      <div
        onMouseEnter={() => setShowSidebar(true)}
        onMouseLeave={() => setShowSidebar(false)}
        className={`hidden lg:flex flex-col mt-1 justify-between p-4 text-white bg-black h-[100vh] fixed transition-all duration-300 z-50 ${
          showSidebar ? "w-[15%]" : "w-[4%]"
        } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800`}
      >
        <div className="space-y-10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={showSidebar ? "https://i.ibb.co/MhTpQsp/Logo.png" : "https://i.ibb.co/RTm0QhP/Screenshot-2024-12-20-150500.png"}
              alt="ClickAndBuy Logo"
              className={`${
                showSidebar ? "h-30" : "h-30" // Set a larger height when showSidebar is false
              } max-w-full filter invert transition-all duration-300`} // Adjust h-40 to a size you prefer
            />
          </div>

          {/* Links */}
          <Link
            to="/home"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome size={26} />
            {showSidebar && <span className="ml-4">HOME</span>}
          </Link>
          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping size={26} />
            {showSidebar && <span className="ml-4">SHOP</span>}
          </Link>
          <Link
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart size={26} />
            {showSidebar && <span className="ml-4">CART</span>}
          </Link>
          <Link
            to="/favorite"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart size={20} />
            {showSidebar && <span className="ml-4">FAVORITES</span>}
          </Link>
        </div>

        {/* User Info for Desktop */}
        <div className="mt-auto">
          {userInfo ? (
            <div className="relative">
              <button className="flex items-center w-full text-left">
                <span className="truncate capitalize underline mt-5">{userInfo.username}</span>
              </button>
              {showSidebar && (
                <ul className="mt-2 space-y-2 max-h-[70vh]">
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center px-4 py-2 hover:bg-blue-500"
                        >
                          <AiOutlineDashboard size={20} />
                          {showSidebar && <span className="ml-4">Dashboard</span>}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="flex items-center px-4 py-2 hover:bg-blue-500"
                        >
                          <AiOutlineShoppingCart size={20} />
                          {showSidebar && <span className="ml-4">Products</span>}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="flex items-center px-4 py-2 hover:bg-blue-500"
                        >
                          <AiOutlineTags size={20} />
                          {showSidebar && <span className="ml-4">Category</span>}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className="flex items-center px-4 py-2 hover:bg-blue-500"
                        >
                          <AiOutlineAppstoreAdd size={20} />
                          {showSidebar && <span className="ml-4">Orders</span>}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/userlist"
                          className="flex items-center px-4 py-2 hover:bg-blue-500"
                        >
                          <AiOutlineUser size={20} />
                          {showSidebar && <span className="ml-4">Users</span>}
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 hover:bg-blue-500"
                    >
                      <AiOutlineUser size={20} />
                      {showSidebar && <span className="ml-4">Profile</span>}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="flex items-center w-full px-4 py-2 hover:bg-red-500"
                    >
                      <FiLogOut size={20} />
                      {showSidebar && <span className="ml-4">Logout</span>}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                className="flex items-center py-2 px-4 hover:bg-blue-500"
              >
              <ul>
                <li className="flex items-center py-2">
                  <AiOutlineLogin size={26} />
                  <span className={`ml-4 ${showSidebar ? "block" : "hidden"}`}>LOGIN</span>
                </li>
              </ul>
              </Link>
                <Link
                  to="/register"
                  className="flex items-center py-2 px-4 hover:bg-blue-500"
                >
                  <ul>
                    <li className="flex items-center py-2">
                      <AiOutlineUserAdd size={26} />
                      <span
                        className={`ml-4 ${showSidebar ? "block" : "hidden"}`}
                      >
                        REGISTER
                      </span>              
                    </li>
                  </ul>
                </Link>
            </div>


          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
