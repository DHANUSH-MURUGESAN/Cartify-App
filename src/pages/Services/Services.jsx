import React, { useEffect } from "react";
import { FaGift, FaTruck, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { useNavigate } from "react-router";

const Services = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="text-center py-16 px-4 lg:mt-18 sm:pt-30 sm:px-6 lg:px-20 bg-cream">
          <h1 className="text-3xl md:text-5xl font-bold text-dark mb-6 leading-snug">
            Making Shopping Easy, Fast, and Fun
          </h1>
          <p className="text-base md:text-xl text-slate max-w-3xl mx-auto">
            At <span className="font-semibold text-amber">Cartify</span>, we bring all your favorite products to one place. From daily essentials to trending items, our services are designed to make your shopping experience seamless and enjoyable.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="mt-6 w-full sm:w-auto bg-amber text-dark px-6 py-3 rounded-full hover:bg-mint hover:text-white transition-transform hover:scale-95"
          >
            Explore Products
          </button>
        </section>

        {/* Services Grid */}
        <section className="bg-cream py-16 px-4 sm:px-6 lg:px-20">
          <h1 className="text-3xl md:text-5xl text-center font-bold text-dark">
            Our Services
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-10 max-w-6xl mx-auto">
            {[
              { icon: <FaShoppingCart />, title: "Wide Product Range", desc: "From electronics to fashion, home essentials to gifts, discover a huge selection curated for you." },
              { icon: <MdEvent />, title: "Event & Occasion Shopping", desc: "Find the perfect products for birthdays, anniversaries, festivals, and more with ease." },
              { icon: <FaGift />, title: "Gifting Solutions", desc: "Choose from curated hampers, gift sets, and premium products for friends, family, or corporate needs." },
              { icon: <FaTruck />, title: "Fast & Reliable Delivery", desc: "Enjoy quick, tracked deliveries straight to your door — hassle-free and dependable." },
              { icon: <FaBoxOpen />, title: "Seasonal Specials", desc: "Grab exclusive deals, discounts, and festive specials every season, only on Cartify." },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl bg-mint text-white transition-transform hover:scale-105"
              >
                <div className="text-4xl mb-4 text-amber">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white text-sm md:text-base">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-cream py-12 sm:py-16 px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">
            Why Choose Cartify?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-6 max-w-6xl mx-auto text-dark">
            {[
              "Vast selection of products for every need",
              "Easy-to-use platform with secure checkout",
              "Exclusive deals, seasonal offers & discounts",
              "Fast delivery & customer-first support",
            ].map((item, index) => (
              <li
                key={index}
                className="p-4 sm:p-6 bg-mint rounded-xl shadow-md hover:shadow-lg hover:bg-amber hover:text-white transition-transform leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section className="bg-beige py-12 sm:py-16 px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">
            Start Shopping with Cartify Today
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate mb-6 max-w-2xl mx-auto px-2 leading-relaxed">
            From everyday essentials to special treats, Cartify makes shopping simple, fun, and reliable. Explore our products and bring convenience to your doorstep.
          </p>
          <button className="w-full sm:w-auto bg-amber text-dark px-6 sm:px-8 py-3 rounded-full hover:bg-mint hover:text-white transition-transform hover:scale-95" onClick={() => navigate("/menu")}>
            Shop Now
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Services;