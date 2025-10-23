import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Nav from "../../Nav";
import Footer from "../../Footer";
import SpecialDishesCards from "../Home/SpecialItemsCards";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import Loader from "../Loaders/Loader";

// Map categories to API names and paths
const categories = [
  { name: "all", label: "All", path: "/menu" },
  { name: "electronics", label: "Electronics", path: "/menu/electronics" },
  { name: "jewelery", label: "Jewelry", path: "/menu/jewelery" },
  { name: "men's clothing", label: "Men's Clothing", path: "/menu/mens-clothing" },
  { name: "women's clothing", label: "Women's Clothing", path: "/menu/womens-clothing" },
];

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // memoized filter (depends only on menu)
  const filterItems = useCallback(
    (categoryName) => {
      if (!menu || menu.length === 0) {
        setFilteredItems([]);
        setSelectedCategory(categoryName);
        return;
      }

      const filtered =
        categoryName === "all"
          ? menu
          : menu.filter(
              (item) =>
                (item.category || "").toString().toLowerCase() ===
                categoryName.toString().toLowerCase()
            );

      setFilteredItems(filtered);
      setSelectedCategory(categoryName);
      setCurrentPage(1);
    },
    [menu]
  );

  // fetch once
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (!mounted) return;
        setMenu(res.data || []);
        setFilteredItems(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        if (!mounted) return;
        setMenu([]);
        setFilteredItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  // react to route changes — determine the category from the URL and apply filter
  useEffect(() => {
    if (!menu || menu.length === 0) return;

    // get the segment after /menu; e.g. "/menu/womens-clothing" => "womens-clothing"
    const prefix = "/menu";
    let remainder = location.pathname.toLowerCase();

    // ensure prefix match
    if (!remainder.startsWith(prefix)) {
      filterItems("all");
      return;
    }

    remainder = remainder.slice(prefix.length); // e.g. "/womens-clothing" or "" or "/electronics"
    // normalize
    remainder = remainder.replace(/^\/|\/$/g, ""); // removes leading/trailing slash

    let matchedCategory;
    if (remainder === "") {
      matchedCategory = categories.find((c) => c.path === "/menu");
    } else {
      matchedCategory = categories.find((c) => c.path === `/menu/${remainder}`);
    }

    const categoryToApply = matchedCategory ? matchedCategory.name : "all";
    filterItems(categoryToApply);
  }, [location.pathname, menu, filterItems]);

  // Sort handler
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItems = [...menu];
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative bg-cream px-6 py-20 lg:mt-18 md:mt-16 text-center overflow-hidden">
  <div className="space-y-5 max-w-4xl mx-auto">
    <h1 className="text-3xl sm:text-5xl font-bold text-dark">
      Discover Amazing <span className="text-mint">Products & Deals</span>
    </h1>
    <p className="text-lg sm:text-xl text-dark">
      Explore electronics, fashion, jewelery, and more!
    </p>
    <button
      className="border-amber bg-amber text-white px-5 py-2 rounded-3xl transition-transform hover:scale-95"
      onClick={() => navigate("/menu")}
    >
      Shop Now
    </button>
  </div>
</section>

{/* Filter & Sort */}
<section className="bg-beige px-4 py-10 sm:px-6 md:px-12 lg:px-20">
  <div className="flex flex-wrap gap-3 justify-center mb-6">
    {categories.map((cat) => (
      <button
        key={cat.name}
        onClick={() => navigate(cat.path)}
        className={`px-4 py-2 rounded-2xl font-semibold transition-colors duration-200 ${
          selectedCategory === cat.name
            ? "bg-amber text-white"
            : "bg-white text-dark hover:bg-amber hover:text-white"
        }`}
      >
        {cat.label}
      </button>
    ))}

    <div className="flex gap-2 sm:ml-auto mt-4 sm:mt-0">
      <FaFilter className="h-6 w-6 text-dark" />
      <select
        value={sortOption}
        onChange={(e) => handleSortChange(e.target.value)}
        className="px-4 py-2 rounded-2xl border border-dark bg-amber text-white"
      >
        <option value="default">Default</option>
        <option value="A-Z">Name A-Z</option>
        <option value="Z-A">Name Z-A</option>
        <option value="low-to-high">Price Low-High</option>
        <option value="high-to-low">Price High-Low</option>
      </select>
    </div>
  </div>

  {/* Product grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {currentItems.length > 0 ? (
      currentItems.map((item) => <SpecialDishesCards key={item.id} item={item} />)
    ) : (
      <p className="text-center col-span-full text-lg text-dark font-semibold">
        No products found in this category.
      </p>
    )}
  </div>
</section>

{/* Pagination */}
<section className="bg-cream px-20 py-3">
  <div className="flex justify-center my-8">
    {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
      <button
        key={index + 1}
        onClick={() => paginate(index + 1)}
        className={`mx-2 px-3 py-1 rounded-full ${
          currentPage === index + 1
            ? "bg-dark text-white"
            : "bg-white text-dark hover:bg-mint hover:text-dark"
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>
</section>

      <Footer />
    </div>
  );
};

export default MenuPage;