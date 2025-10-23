import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useLocation, useNavigate } from "react-router";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    doorNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, mobile, doorNo, address, city, state, pincode } = formData;
    if (!name || !mobile || !doorNo || !address || !city || !state || !pincode) {
      toast.error("Please fill in all receiving details", { autoClose: 2000 });
      return false;
    }
    if (paymentMethod === "card" && (!cardNumber || cardNumber.length < 16)) {
      toast.error("Please enter a valid 16-digit card number", {
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    try {
      // Fake Store API requires: userId, date, and products[]
      const orderData = {
        userId: 5, // Dummy user
        date: new Date().toISOString(),
        products: cart.map((item) => ({
          productId: item.id || item._id || 1,
          quantity: item.quantity,
        })),
      };

      const res = await axios.post("https://fakestoreapi.com/carts", orderData);

      if (res.status === 200 || res.status === 201) {
        toast.success("Order placed successfully!", { autoClose: 2000 });
        clearCart();
        setTimeout(() => navigate("/orders"), 1500);
      } else {
        toast.error("Failed to place order. Try again!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong!");
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    if (paymentMethod === "cod") {
      placeOrder();
    } else if (paymentMethod === "card") {
      // Simulate payment success (Fake Store API has no payment endpoint)
      toast.success("Payment Successful!", { autoClose: 2000 });
      setTimeout(() => {
        placeOrder();
      }, 1000);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-10 py-28 bg-cream min-h-screen">
        <ToastContainer position="top-right" />
        <h1 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((item) => (
                <div
                  key={item._id || item.id}
                  className="bg-lavender shadow-lg rounded-xl p-4 flex flex-col justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-contain mb-4 rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                    <p className="text-gray-600">Price: ₹ {item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="mt-2 font-medium">
                      Total: ₹ {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="text-right mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Grand Total: ₹ {totalPrice}
              </h2>
            </div>

            {/* Delivery Details */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-choco">
                Delivery Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>Door Number</label>
                  <input
                    type="text"
                    name="doorNo"
                    value={formData.doorNo}
                    onChange={handleChange}
                    placeholder="Door Number"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div className="md:col-span-3">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>Pincode</label>
                  <input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
              </form>
            </div>

            {/* Payment Section */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-5 text-choco">
                Payment Details
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit / Debit Card
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <label className="block font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength="16"
                    placeholder="Enter 16-digit card number"
                    className="p-3 border rounded-lg w-full tracking-widest text-lg"
                  />
                </div>
              )}

              <div className="text-right mt-6">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition duration-300"
                >
                  {paymentMethod === "card"
                    ? `Pay ₹${totalPrice}`
                    : "Place Order"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

