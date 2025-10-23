import React, { useEffect, useState, useCallback } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId") || "1";

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
      const carts = res.data || [];

      const detailedOrders = await Promise.all(
        carts.map(async (cart) => {
          const items = await Promise.all(
            cart.products.map(async (p) => {
              const productRes = await axios.get(`https://fakestoreapi.com/products/${p.productId}`);
              const product = productRes.data;
              return {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: p.quantity,
                total: (product.price * p.quantity).toFixed(2),
              };
            })
          );

          const totalPrice = items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2);

          return {
            id: cart.id,
            date: cart.date,
            items,
            totalPrice,
            status: "Pending",
          };
        })
      );

      setOrders(detailedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders");
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCancel = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    toast.success("Order cancelled successfully!", { autoClose: 2000 });
  };

  return (
    <>
      <Nav />
      <div className="p-10 bg-cream min-h-screen mt-18 sm:mt-16">
        <h1 className="text-3xl font-bold text-dark mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-md p-6 rounded-xl">
                <h2 className="font-bold text-lg mb-2">Order #CFY{order.id}</h2>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ₹ {order.totalPrice}</p>
                <p>Status: {order.status}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="border p-3 rounded-lg text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 mx-auto mb-2 object-contain"
                      />
                      <p>{item.title}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹ {item.total}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;