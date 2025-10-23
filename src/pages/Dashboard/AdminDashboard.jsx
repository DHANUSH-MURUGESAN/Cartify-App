import React, { useEffect, useState } from "react";
import Nav from "../../Nav";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("catalog");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err.message);
    }
  };

  const getOrders = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/carts");
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err.message);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-amber fixed top-0 left-0 h-screen text-white p-6 lg:mt-18 sm:mt-10">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                activeTab === "catalog"
                  ? "bg-white text-amber font-bold border-2 border-white"
                  : "hover:bg-white hover:text-amber hover:border-2 hover:border-white"
              }`}
              onClick={() => setActiveTab("catalog")}
            >
              Catalog
            </li>
            <li
              className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                activeTab === "orders"
                  ? "bg-white text-amber font-bold border-2 border-white"
                  : "hover:bg-white hover:text-amber hover:border-2 hover:border-white"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Order Details
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-10 bg-cream h-screen overflow-y-auto lg:mt-18 sm:mt-18">
          {activeTab === "catalog" && (
            <>
              <h1 className="text-3xl text-dark font-bold mb-6">
                Catalog Management
              </h1>

              {/* Search */}
              <div className="inline-flex justify-center mt-10 ml-200">
                <form className="mb-4 flex bg-white px-4 py-2 rounded-3xl w-90">
                  <input
                    type="text"
                    placeholder="Search by title, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full outline-none text-dark"
                  />
                  <button type="submit" className="text-dark hover:text-amber">
                    <FiSearch size={20} />
                  </button>
                </form>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto mt-10">
                <table className="table-auto w-full border border-dark border-collapse">
                  <thead>
                    <tr className="bg-amber text-white text-center">
                      <th className="border px-4 py-2">Image</th>
                      <th className="border px-4 py-2">Title</th>
                      <th className="border px-4 py-2">Description</th>
                      <th className="border px-4 py-2">Category</th>
                      <th className="border px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="border px-4 py-2">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="border px-4 py-2 text-dark">
                            {product.title}
                          </td>
                          <td className="border px-4 py-2 text-dark">
                            {product.description}
                          </td>
                          <td className="border px-4 py-2 text-dark">
                            {product.category}
                          </td>
                          <td className="border px-4 py-2 text-center text-dark">
                            ₹{product.price}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="border px-4 py-2 text-center text-dark"
                        >
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <>
              <h1 className="text-3xl text-dark font-bold mb-6">
                Order Details
              </h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-dark border-collapse">
                  <thead>
                    <tr className="bg-amber text-white text-center">
                      <th className="border px-4 py-2">Order ID</th>
                      <th className="border px-4 py-2">User ID</th>
                      <th className="border px-4 py-2">Items</th>
                      <th className="border px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id}>
                          <td className="border px-4 py-2 text-dark">
                            #CFY{order.id}
                          </td>
                          <td className="border px-4 py-2 text-dark">
                            {order.userId}
                          </td>
                          <td className="border px-4 py-2 text-dark">
                            <ul className="list-disc pl-4">
                              {order.products.map((item) => (
                                <li key={item.productId}>
                                  Product ID: {item.productId} × {item.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="border px-4 py-2 text-center">
                            <select
                              className="bg-white text-dark rounded px-2 py-1 border border-dark"
                              value={orderStatuses[order.id] || "On Process"}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value)
                              }
                            >
                              <option value="On Process">On Process</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="border px-4 py-2 text-center text-dark"
                        >
                          No Orders Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
