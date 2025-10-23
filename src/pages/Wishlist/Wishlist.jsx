import React, { useEffect, useState } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { Link } from "react-router";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const removeFromWishlist = (id) => {
  const updatedWishlist = wishlist.filter((item) => item.id !== id);
  setWishlist(updatedWishlist);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
};

  return (
    <>
      <Nav />
      <div className="p-10 bg-cream min-h-screen lg:mt-16 xl:mt-10 sm:pt-20 md:mt-16">
        <h1 className="text-3xl font-bold text-dark mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-lg text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-xl p-4 flex flex-col hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/menu/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 object-contain mx-auto"
                  />
                  <h2 className="text-lg font-semibold mt-3 text-gray-800 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-indigo-600 font-bold mt-1">₹ {item.price}</p>
                </Link>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 transition"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;