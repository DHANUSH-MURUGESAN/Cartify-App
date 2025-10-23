import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fake Store API signup (POST to /users)
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        {
          email: formData.email,
          username: formData.username || formData.email.split("@")[0],
          password: formData.password,
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          address: {
            city: "DemoCity",
            street: "DemoStreet",
            number: 123,
            zipcode: "12345-6789",
            geolocation: { lat: "-37.3159", long: "81.1496" },
          },
          phone: "123-456-7890",
        }
      );

      console.log("Signup success:", response.data);
      toast.success("Signup successful! Redirecting to login...", {
        autoClose: 3000,
        theme: "colored",
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Signup failed! Try again.", { autoClose: 3000, theme: "colored" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-mint/50">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          className="border p-2 w-full rounded"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          className="border p-2 w-full rounded"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          Sign Up
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;