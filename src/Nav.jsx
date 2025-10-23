import React, { useContext, useEffect, useState } from "react";
import logo from "./assets/home/img/Group 29.png";
import { CgChevronUp } from "react-icons/cg";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "./contexts/AuthContext";
import Profile from "./Profile";
import { FiSearch } from "react-icons/fi";
import { CartContext } from "./contexts/CartContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Nav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // max 6
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const foundItem = products.find((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (foundItem) {
      navigate(`/menu/${foundItem.id}`);
    } else {
      toast.info("Item not found!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSelect = (item) => {
    navigate(`/menu/${item.id}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <ToastContainer />
      <header className="bg-dark text-cream flex items-center justify-between w-full px-6 py-3 fixed top-0 z-50">
  {/* Logo */}
  <Link to="/">
    <img src={logo} className="w-32 md:w-40" alt="Sweet Heart Logo" />
  </Link>

  {/* Desktop Menu */}
  <nav className="hidden md:flex items-center gap-8">
    <ul className="flex gap-8">
      <li className={isActive("/") ? "text-amber font-bold " : "hover:text-mint"}>
        <Link to="/">Home</Link>
      </li>
      <li className="relative cursor-pointer hover:text-mint">
        <button
          onClick={() => toggleDropdown("menu")}
          className={isActive("/menu") ? "text-amber font-bold flex items-center gap-1" : "flex items-center gap-1"}
        >
          Menu
          {activeDropdown === "menu" ? <CgChevronUp size={16} /> : <BiChevronDown size={16} />}
        </button>
        {activeDropdown === "menu" && (
          <ul className="absolute left-0 mt-2 w-40 rounded-lg bg-cream text-dark shadow-lg">
            <li className="px-4 py-2 hover:bg-mint rounded-t-lg">
              <Link to="/menu">All</Link>
            </li>
            <li className="px-4 py-2 hover:bg-mint">
              <Link to="/menu/electronics">Electronics</Link>
            </li>
            <li className="px-4 py-2 hover:bg-mint">
              <Link to="/menu/jewelery">Jewelry</Link>
            </li>
            <li className="px-4 py-2 hover:bg-mint">
              <Link to="/menu/mens-clothing">Men's Clothing</Link>
            </li>
            <li className="px-4 py-2 hover:bg-mint rounded-b-lg">
              <Link to="/menu/womens-clothing">Women's Clothing</Link>
            </li>
          </ul>
        )}
      </li>
      <li className={isActive("/services") ? "text-amber font-bold" : "hover:text-mint"}>
        <Link to="/services">Services</Link>
      </li>
      <li className="hover:text-mint transition">
        <Link to="/offers">Offers</Link>
      </li>
    </ul>
  </nav>

  {/* Right Side */}
  {token ? (
    <div className="hidden md:flex items-center gap-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-3xl px-3 py-1 border border-gray-light">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className="outline-none px-2 text-slate w-36"
        />
        <button type="submit" className="text-slate hover:text-mint">
          <FiSearch size={20} />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute top-15 right-19 bg-white text-slate rounded-lg shadow-md w-60 max-h-64 overflow-y-auto z-50">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-mint cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}

      {/* Cart Icon */}
      <Link to="/cart" className="relative hover:text-mint">
        <FaShoppingCart size={22} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber text-dark text-xs font-bold rounded-full px-1">
            {cart.length}
          </span>
        )}
      </Link>

      <Profile user={user} />
    </div>
  ) : (
    <div className="hidden md:flex items-center gap-6">
      <Link
        to="/login"
        className="border-sky bg-sky text-white px-4 py-2 inline-flex rounded-3xl hover:bg-mint transition"
      >
        <FaRegUser className="mt-1 mr-2" /> Login
      </Link>
    </div>
  )}

  {/* Mobile Hamburger */}
  <div className="md:hidden">
    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
      {mobileMenuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
    </button>
  </div>
</header>

{/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="md:hidden bg-dark text-cream flex flex-col px-6 py-4 gap-4 relative">
    <form onSubmit={handleSearch} className="flex items-center bg-white rounded-3xl px-3 py-1">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        className="outline-none px-2 text-slate w-full"
      />
      <button type="submit" className="text-slate hover:text-mint">
        <FiSearch size={20} />
      </button>
    </form>
    {suggestions.length > 0 && (
      <ul className="absolute top-12 left-0 bg-white text-slate rounded-lg shadow-md w-60 max-h-64 overflow-y-auto z-50">
        {suggestions.map((item) => (
          <li key={item.id} onClick={() => handleSelect(item)} className="px-4 py-2 hover:bg-mint cursor-pointer">
            {item.title}
          </li>
        ))}
      </ul>
    )}
    <Link to="/" className={isActive("/") ? "text-amber font-bold" : ""}>Home</Link>
    <Link to="/menu">Menu</Link>
    <Link to="/services" className={isActive("/services") ? "text-amber font-bold" : ""}>Services</Link>
    <Link to="/offers">Offers</Link>
    {token ? (
      <div className="flex items-center gap-4 mt-2">
        <Link to="/cart" className="relative hover:text-mint">
          <FaShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber text-dark text-xs font-bold rounded-full px-1">
              {cart.length}
            </span>
          )}
        </Link>
        <Profile user={user} />
      </div>
    ) : (
      <Link
        to="/login"
        className="border-sky bg-sky text-white px-4 py-2 inline-flex rounded-3xl hover:bg-mint transition"
      >
        <FaRegUser className="mt-1 mr-2" /> Login
      </Link>
    )}
  </div>
      )}
    </div>
  );
};

export default Nav;