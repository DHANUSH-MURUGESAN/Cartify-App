import React, { useEffect, useState, useContext } from "react";
import { Howl } from "howler";
import { useParams } from "react-router";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { CartContext } from "../../contexts/CartContext";
import { FaHeart, FaStar } from "react-icons/fa";
import heartSoundFile from "../../assets/home/bubblepop.mp3";

const MenuItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
  const fetchItem = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error("Error fetching item details:", err);
    }
  };
  fetchItem();
}, [id]);
  const { addToCart } = useContext(CartContext);
  const [isHeartFill, setHeartFill] = useState(false);
  const sound = new Howl({ src: [heartSoundFile] });

  useEffect(() => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = wishlist.find((i) => i.id === item?.id);
  setHeartFill(!!exists);
}, [item]);

  const handleHeart = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = wishlist.find((i) => i.id === item.id);

  let updatedWishlist;
  if (exists) {
    updatedWishlist = wishlist.filter((i) => i.id !== item.id);
    setHeartFill(false);
  } else {
    updatedWishlist = [...wishlist, item];
    sound.play();
    setHeartFill(true);
  }

  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
};
  if (!item) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="bg-cream py-20 px-10 lg:mt-18">
  <section className="relative flex flex-col md:flex-col lg:flex-row gap-10 bg-cream">
    {/* ❤️ Heart */}
    <div
      className="rating gap-1 absolute left-97 top-0 p-4 sm:left-107 md:left-123 lg:top-22 lg:left-97 xl:top-3 2xl:top-0 heartStar bg-dark cursor-pointer"
      onClick={handleHeart}
    >
      <FaHeart
        className={`h-5 w-5 transition-transform duration-300 ${
          isHeartFill ? "text-red-500 scale-125" : "text-white"
        }`}
      />
    </div>

    {/* 🖼️ Product Image */}
    <div className="flex justify-center items-center mx-10">
      <div className="bg-gradient-to-r from-mint/50 to-amber/50 rounded-3xl py-6 px-10">
        <img
          src={item.image}
          alt={item.title}
          className="w-80 h-80 object-contain"
        />
      </div>
    </div>

    {/* 📄 Product Details */}
    <div className="flex-1 space-y-3 mt-10 mx-10">
      <h1 className="text-3xl font-bold text-dark mb-4">{item.title}</h1>
      <p className="text-dark text-lg leading-relaxed">{item.description}</p>

      <div className="flex-row items-center text-[16px] font-semibold">
        <div className="text-mint font-semibold border-2 rounded-2xl px-2 w-15 mb-6 flex items-center gap-1">
          <FaStar className="text-amber" /> {item.rating?.rate ?? "4.5"}
        </div>
        <div className="text-mint text-[20px]">
          ₹ {item.price} /-{" "}
          <span className="text-[16px] ml-3">(Inclusive of all taxes)</span>
        </div>
      </div>

      <button
        onClick={() => addToCart(item)}
        className="bg-dark text-white px-6 py-3 rounded-3xl font-semibold hover:bg-amber transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  </section>
</main>
      <Footer />
    </div>
  );
};

export default MenuItemDetail;