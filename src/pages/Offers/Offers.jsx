import React, { useEffect } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { FaBolt, FaFire, FaGift } from "react-icons/fa";
import cracker from "../../assets/home/img/Deepam.png";
import kolam from "../../assets/home/img/kolam.png";

const Offers = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const offers = [
    {
      id: 1,
      icon: <FaGift className="text-orange-700 text-4xl" />,
      title: "Festive Combos",
      desc: "Buy 2 Get 1 Free on Diwali specials. Perfect for gifting!",
      btn: "Grab Deal",
    },
    {
      id: 2,
      icon: <FaBolt className="text-orange-500 text-4xl" />,
      title: "Top 3 Huge Orders Gift!",
      desc: "Win a Vivo V10 worth ₹39,999! The top 3 highest orders this Diwali will be gifted.",
      btn: "Order Now",
    },
    {
      id: 3,
      icon: <FaFire className="text-red-500 text-4xl" />,
      title: "Festive Hampers",
      desc: "Exclusive hampers starting at just ₹499 with free goodies.",
      btn: "Explore",
    },
  ];

  return (
    <>
  <Nav />
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-amber/30 to-mint/20 py-16 px-6 sm:pt-20 md:pt-30 text-center">
    {/* Decorative Crackers */}
    <img
      src={cracker}
      className="absolute left-10 md:top-20 sm:left-5 sm:top-16 w-16 h-16 animate-cracker"
      alt="cracker"
    />
    <img
      src={cracker}
      className="absolute lg:left-40 lg:top-24 lg:w-20 lg:h-20 hidden lg:block animate-cracker"
      alt="cracker"
    />
    <img
      src={cracker}
      className="absolute right-10 md:top-20 sm:right-5 sm:top-16 w-16 h-16 animate-cracker"
      alt="cracker"
    />
    <img
      src={cracker}
      className="absolute lg:right-40 lg:top-24 lg:w-20 lg:h-20 hidden lg:block animate-cracker"
      alt="cracker"
    />

    {/* Title Section */}
    <div className="mb-12 relative z-10">
      <h1 className="text-4xl font-extrabold text-dark drop-shadow-lg">
        ✨ Diwali Dhamaka Offers ✨
      </h1>
      <p className="mt-4 text-lg text-slate">
        Celebrate the festival of lights with sparkling discounts, festive hampers, and limited-time deals!
      </p>
    </div>

    {/* Offers Grid */}
    <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mb-20 mx-auto">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="bg-white rounded-2xl shadow-md p-6 hover:scale-105 transition-transform duration-300 border border-gray-light"
        >
          <div className="flex justify-center text-mint text-4xl">{offer.icon}</div>
          <h2 className="text-xl font-bold text-dark mt-4">{offer.title}</h2>
          <p className="text-slate mt-2">{offer.desc}</p>
          <button className="mt-4 px-5 py-2 rounded-full bg-amber text-dark font-semibold hover:bg-mint hover:text-white transition">
            {offer.btn}
          </button>
        </div>
      ))}
    </div>

    {/* Center Kolam */}
    <div className="relative flex justify-center items-center w-50 h-40 mx-auto z-10">
      <img
        src={kolam}
        className="absolute w-50 h-50 animate-spin-slow opacity-20"
        alt="Kolam"
      />
    </div>

    {/* Corner Kolams */}
    <img
      src={kolam}
      className="absolute hidden lg:block -left-40 bottom-0 w-80 h-80 opacity-10 animate-spin-slow z-0"
      alt="Kolam"
    />
    <img
      src={kolam}
      className="absolute hidden lg:block -right-40 bottom-0 w-80 h-80 opacity-10 animate-spin-slow-reverse z-0"
      alt="Kolam"
    />
  </section>

  <Footer />
</>
  );
};

export default Offers;