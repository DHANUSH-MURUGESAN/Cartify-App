import React, { useState, useContext } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AuthContext } from "./contexts/AuthContext";
import { useNavigate, Link } from "react-router";
import { FaBoxOpen, FaHeart, FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    toast.success("Logout successful! Redirecting to login...", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    navigate("/login");
  };

  // Profile image fallback
  const renderProfileIcon = () => {
    if (user?.photo) {
      return (
        <img
          src={user.photo}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    } else if (user?.username) {
      return (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-caramel text-white font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
      );
    } else if (user?.email) {
      return (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-caramel text-white font-bold">
          {user.email.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return <FaRegUser className="w-8 h-8" />;
    }
  };

  return (
    <div className="relative">
  {/* Profile Button */}
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 bg-mint text-dark p-1 rounded-full hover:scale-95 transition-transform shadow-sm"
  >
    {renderProfileIcon()}
    <span className="text-lg hidden">
      {open ? <BiChevronUp /> : <BiChevronDown />}
    </span>
  </button>

  {/* Dropdown Menu */}
  {open && (
    <ul className="absolute right-0 mt-2 w-40 rounded-lg bg-cream text-dark shadow-lg border border-mint z-50">
      <li className="flex items-center gap-2 px-4 py-2 hover:bg-peach rounded-t-lg cursor-pointer">
        <FaRegUser className="text-dark" />
        <Link to="/update-profile" className="w-full">My Profile</Link>
      </li>
      <li className="flex items-center gap-2 px-4 py-2 hover:bg-peach cursor-pointer">
        <FaBoxOpen className="text-dark" />
        <Link to="/orders" className="w-full">My Orders</Link>
      </li>
      <li className="flex items-center gap-2 px-4 py-2 hover:bg-peach cursor-pointer">
        <FaHeart className="text-dark" />
        <Link to="/wishlist" className="w-full">My Wishlist</Link>
      </li>
      <li
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 hover:bg-peach rounded-b-lg cursor-pointer"
      >
        <MdLogout className="text-dark" />
        <span>Logout</span>
      </li>
    </ul>
  )}
</div>
  );
};

export default Profile;