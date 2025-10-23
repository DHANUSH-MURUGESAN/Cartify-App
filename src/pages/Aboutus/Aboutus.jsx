import React, { useEffect } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
  <Nav />

  <div className="bg-white">
    {/* Hero Section */}
    <section className="text-center py-16 px-4 sm:px-6 lg:px-20 lg:mt-18 md:mt-18 sm:mt-16 bg-cream">
      <h1 className="text-3xl md:text-5xl font-bold text-dark mb-6 leading-snug">
        About Cartify
      </h1>
      <p className="text-base md:text-xl text-choco max-w-3xl mx-auto">
        Making shopping seamless, convenient, and delightful — every product, every order, every time.
      </p>
    </section>

    {/* Our Story */}
    <section className="bg-beige py-16 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 text-center">
        Our Story
      </h2>
      <div className="max-w-5xl mx-auto text-choco text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
        <p>
          At <span className="font-semibold text-caramel">Cartify</span>, we believe shopping should be more than just transactions — it’s about convenience, choice, and experience. What started as a small online platform has grown into a trusted destination for shoppers seeking quality products and exceptional service.
        </p>
        <p>
          Our journey began with a simple goal: to make online shopping effortless for everyone. From everyday essentials to trending products, we have always focused on delivering value, reliability, and delight in every order.
        </p>
        <p>
          Cartify bridges technology with customer care. While we leverage the latest e-commerce innovations for a smooth shopping experience, we never lose sight of personal service, attention to detail, and trust. Every product, every offer, every interaction is designed to create satisfaction and confidence.
        </p>
        <p>
          Growth for us is measured not by numbers, but by happy customers. Whether it’s a family receiving groceries, a student buying tech gadgets, or a professional finding the perfect gift, we aim to make every shopping experience memorable and hassle-free.
        </p>
        <p>
          At Cartify, we don’t just sell products — we create convenience, trust, and joy in every order.
        </p>
      </div>
    </section>

    {/* What Makes Us Different */}
    <section className="bg-cream py-16 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
        What Makes Us Different?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto">
        {[
          { title: "✨ Wide Product Range", desc: "From essentials to trending products, all in one place." },
          { title: "✨ Fast & Reliable Delivery", desc: "Orders delivered quickly and safely to your doorstep." },
          { title: "✨ Customer-Centric Service", desc: "Support that’s ready to assist you at every step." },
          { title: "✨ Exclusive Deals & Offers", desc: "Regular discounts, promotions, and loyalty rewards." },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-2xl hover:shadow-lg bg-gradient-to-r from-mint to-amber/50 transition-transform text-center text-cream"
          >
            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
            <p className="text-sm sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Our Promise */}
    <section className="bg-beige py-16 px-4 sm:px-6 lg:px-20 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">
        Our Promise
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-choco max-w-3xl mx-auto leading-relaxed">
        At Cartify, we promise a seamless shopping experience, with quality products, reliable delivery, and customer-first support — every time you shop with us.
      </p>
    </section>

    {/* Closing Quote */}
    <section className="bg-gradient-to-r from-mint to-caramel py-12 text-center text-dark">
      <p className="text-base sm:text-lg md:text-xl italic max-w-3xl mx-auto leading-relaxed">
        “Shopping made simple, fast, and enjoyable. With Cartify, every order is a step toward convenience, trust, and happiness. Thank you for making us part of your everyday life.”
      </p>
    </section>
  </div>

  <Footer />
</>
  );
};

export default Aboutus;