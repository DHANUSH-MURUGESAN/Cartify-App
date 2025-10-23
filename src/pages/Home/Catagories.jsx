import React from "react";
import electronicsImg from "../../assets/home/categories/electronics.png";
import fashionImg from "../../assets/home/categories/fashion.png";
import jewelryImg from "../../assets/home/categories/jewelry.png";
import allProductsImg from "../../assets/home/categories/all.png";

const categoryItems = [
  {
    id: 1,
    title: "Electronics",
    description1: "(Gadgets & Accessories)",
    description2: "100+ products",
    image: electronicsImg,
    path: "/menu/electronics",
  },
  {
    id: 2,
    title: "Fashion",
    description1: "(Men & Women Clothing)",
    description2: "200+ products",
    image: fashionImg,
    path: "/menu/fashion",
  },
  {
    id: 3,
    title: "Jewelery",
    description1: "(Rings, Necklaces & More)",
    description2: "150+ products",
    image: jewelryImg,
    path: "/menu/jewelry",
  },
  {
    id: 4,
    title: "Browse All",
    description1: "(Explore all categories)",
    description2: "500+ products",
    image: allProductsImg,
    path: "/menu",
  },
];

const Categories = ({ navigate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center mt-12 w-full px-6">
  {categoryItems.map((item) => (
    <div
      key={item.id}
      className="shadow-md rounded-3xl bg-white py-6 px-5 w-full sm:w-72 lg:w-80 xl:w-72 text-center cursor-pointer border border-gray-light hover:-translate-y-3 hover:shadow-xl transition-all duration-300"
      data-aos="flip-left"
      data-aos-duration="2000"
      onClick={() => navigate(item.path)}
    >
      {/* Image Circle */}
      <div className="flex w-full justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="bg-mint/20 p-2 rounded-full h-36 w-36 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Text Details */}
      <div className="mt-5 space-y-1">
        <h1 className="text-dark text-lg sm:text-xl font-bold">
          {item.title}
        </h1>
        <p className="text-sky font-medium text-sm sm:text-base">
          {item.description1}
        </p>
        <p className="text-slate/70 font-medium text-xs sm:text-sm">
          {item.description2}
        </p>
      </div>
    </div>
  ))}
</div>
  );
};

export default Categories;