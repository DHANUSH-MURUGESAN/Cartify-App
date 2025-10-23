import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, signupWithGmail } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user"); // default role
  const [showPassword, setShowPassword] = useState(true);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login(formData.email, formData.password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", user.email);

      setUser({
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL || null,
        role,
      });

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
      });

      navigate(role === "admin" ? "/admin-dashboard" : "/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signupWithGmail();
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", user.email);

      setUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role,
      });

      toast.success("Google login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => navigate(role === "admin" ? "/admin-dashboard" : "/"), 2000);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-cream p-6 min-h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="bg-mint/50 text-white rounded-xl shadow-lg p-10 space-y-6 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-white">Login</h2>

        {/* Role selection buttons */}
        <div className="flex gap-4 mb-4 justify-center items-center">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-3xl ${
              role === "user" ? "bg-mint text-white" : "bg-cream text-slate"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-3xl ${
              role === "admin" ? "bg-amber text-white" : "bg-cream text-slate"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-xl text-dark">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              autoComplete="email"
              className="bg-cream text-slate rounded p-2 w-full mt-1 focus:ring-5 focus:ring-amber"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-xl text-dark">
              Password
            </label>
            <input
              type={showPassword ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              className="bg-cream text-slate rounded p-2 w-full my-1 focus:ring-5 focus:ring-amber"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1.5 text-slate"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="bg-amber text-white text-center p-2 mt-5 rounded-3xl text-xl w-full transition-transform hover:scale-95"
            >
              Login as {role === "admin" ? "Admin" : "User"}
            </button>
          </div>
        </form> */}

        {/* Google login */}
        <div className="flex justify-center gap-4 mt-4">
          <FaGoogle
            className="border-2 rounded-full h-10 w-10 p-2 cursor-pointer text-slate border-slate hover:border-dark/50 hover:text-dark/50"
            onClick={handleGoogleLogin}
          />
        </div>

        <p className="text-center text-xl mt-4 text-dark">
          Register your details?
          <Link to="/signup" className="text-sky hover:underline mx-1">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;