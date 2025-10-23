import React, { useState, useEffect, useContext } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Howl } from "howler";
import { Link } from "react-router";
import { CartContext } from "../../contexts/CartContext";
import heartSoundFile from "../../assets/home/bubblepop.mp3";

const SpecialDishesCards = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [isHeartFill, setHeartFill] = useState(false);
  const sound = new Howl({ src: [heartSoundFile] });

  useEffect(() => {
    // Check if item is already in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((i) => i.id === item.id);
    setHeartFill(!!exists);
  }, [item.id]);

  const handleHeart = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((i) => i.id === item.id);

    let updatedWishlist;
    if (exists) {
      // Remove from wishlist
      updatedWishlist = wishlist.filter((i) => i.id !== item.id);
      setHeartFill(false);
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlist, item];
      sound.play();
      setHeartFill(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="w-full sm:w-64 md:w-64 lg:w-68 xl:w-72">
  <div className="bg-white rounded-3xl p-5 relative shadow-md hover:shadow-xl transition-all duration-300 border border-gray-light">
    {/* ❤️ Heart Icon */}
    <div
      className="absolute right-0 top-0 p-3 bg-sky heartStar cursor-pointer transition-all"
      onClick={handleHeart}
    >
      <FaHeart
        className={`h-5 w-5 transition-transform duration-300 ${
          isHeartFill ? "text-red-500 scale-125" : "text-white"
        }`}
      />
    </div>

    {/* Product Image */}
    <Link to={`/menu/${item.id}`}>
      <img
        src={item.image}
        alt={item.title}
        className="h-40 mx-auto object-contain transition-transform hover:scale-110 duration-300"
      />
      <h1 className="text-slate font-bold text-lg line-clamp-1 mt-3">
        {item.title}
      </h1>
      <p className="font-semibold text-mint">₹ {item.price}</p>
    </Link>

    {/* Add to Cart */}
    <button
      onClick={() => addToCart(item)}
      className="mt-5 w-full bg-amber text-dark py-2 rounded-xl font-semibold hover:bg-sky hover:text-white transition duration-300"
    >
      Add to Cart
    </button>
  </div>
</div>
  );
};

export default SpecialDishesCards;