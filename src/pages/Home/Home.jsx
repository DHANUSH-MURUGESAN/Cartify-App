import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import girl from "../../assets/home/img/heroimage.png";
import Catagories from "./Catagories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SpecialDishesCards from "./SpecialItemsCards";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch products from Fakestore API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Sort by rating descending and pick top 8
        const topRated = [...data]
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 8);
        setProducts(topRated);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative bg-cream flex flex-col lg:flex-row justify-between items-center px-6 pt-24 md:px-12 lg:px-20 pb-16 lg:py-28">
  <div
    className="flex flex-col gap-6 max-w-xl text-center sm:items-center lg:text-left"
    data-aos="fade-right"
  >
    <h1 className="text-3xl md:text-5xl font-bold text-dark">
      Discover the Best in{" "}
      <span className="text-mint">Electronics, Fashion & Lifestyle</span>
    </h1>
    <p className="text-base md:text-xl text-slate">
      Your one-stop e-commerce store for trending electronics, fashion, and lifestyle essentials.
    </p>
    <Link
      to="/menu"
      className="bg-amber text-dark px-6 py-2 rounded-3xl hover:bg-mint hover:text-white transition-transform hover:scale-95 shadow-md"
    >
      Order Now
    </Link>
  </div>

  <div
    className="rounded-full w-80 h-80 sm:w-96 sm:h-96 lg:h-80 lg:w-80 xl:m-auto bg-dark flex items-center justify-center mt-10 lg:mt-20"
    data-aos="zoom-in"
  >
    <div className="rounded-full w-64 h-64 sm:w-80 sm:h-80 lg:h-72 lg:w-72 bg-mint shadow-xl flex items-center justify-center">
      <img
        src={girl}
        alt="Girl"
        className="w-full h-full lg:h-80 object-contain rounded-full"
      />
    </div>
  </div>
</section>

{/* CATEGORIES */}
<section className="bg-white px-6 md:px-12 lg:px-20 py-16">
  <div className="text-center">
    <p className="text-lg md:text-xl font-medium text-sky mb-5">
      CUSTOMER FAVOURITES
    </p>
    <h1 className="text-3xl md:text-5xl font-bold text-dark">
      Popular Categories
    </h1>
    <Catagories />
  </div>
</section>

{/* FEATURED PRODUCTS */}
<section className="bg-cream px-6 md:px-12 lg:px-20 py-16">
  <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
    <div className="sm:flex sm:flex-col sm:text-center md:text-left" data-aos="fade-right">
      <p className="text-lg md:text-xl font-medium text-sky mb-3">
        FEATURED PRODUCTS
      </p>
      <h1 className="text-3xl md:text-5xl font-bold text-dark">
        Top Picks & Bestsellers <br className="hidden md:block" /> at Cartify
      </h1>
    </div>
    <div className="flex gap-4" data-aos="fade-left">
      <button
        onClick={() => slider?.current?.slickPrev()}
        className="border-4 border-slate p-2 rounded-full hover:bg-gray-light hover:shadow-md transition"
      >
        <FaAngleLeft className="w-6 h-6 text-slate" />
      </button>
      <button
        onClick={() => slider?.current?.slickNext()}
        className="border-4 border-slate bg-slate p-2 rounded-full hover:bg-dark transition"
      >
        <FaAngleRight className="w-6 h-6 text-cream" />
      </button>
    </div>
  </div>

  <Slider ref={slider} {...settings} className="mt-10">
    {products.map((item) => (
      <SpecialDishesCards key={item.id} item={item} />
    ))}
  </Slider>
</section>

{/* OUR STORY */}
<section className="bg-white px-6 md:px-12 lg:px-20 py-16">
  <div className="flex flex-col lg:flex-row sm:flex-col sm:text-center justify-between items-start gap-10">
    {/* Text */}
    <div className="w-full lg:w-1/2 lg:text-left" data-aos="fade-right">
      <p className="text-lg md:text-xl font-medium text-sky mb-5">
        ABOUT CARTIFY
      </p>
      <h1 className="text-3xl md:text-5xl font-bold text-dark">
        Your Ultimate Online Shopping Experience
      </h1>
      <p className="text-slate mt-5 text-base md:text-lg">
        At Cartify, we bring you the latest gadgets, fashion trends, and lifestyle essentials all in one place. Shop with confidence, enjoy fast delivery, and discover exclusive deals tailored just for you.
      </p>
      <button
        onClick={() => navigate("/services")}
        className="bg-amber text-dark px-6 py-2 rounded-3xl mt-6 hover:bg-mint hover:text-white transition-transform hover:scale-95 shadow-md"
      >
        Explore Services
      </button>
    </div>

    {/* Services */}
    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        { title: "Wide Selection", desc: "Explore thousands of products across electronics, fashion, and lifestyle" },
        { title: "Fast Delivery", desc: "Get your orders delivered quickly and safely to your doorstep" },
        { title: "Exclusive Deals", desc: "Enjoy special offers and discounts on trending products" },
        { title: "Customer Support", desc: "Our team is here to help you with any queries or concerns" },
      ].map((service, index) => (
        <div
          key={index}
          className="border-2 border-gray-light rounded-3xl shadow-md bg-cream text-dark p-5 hover:border-mint hover:shadow-lg transition"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          <h1 className="text-lg md:text-xl font-bold text-sky">{service.title}</h1>
          <p className="text-sm md:text-base text-slate">{service.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
};

export default Home;