import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Nav from "../../Nav";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext); // from AuthContext
  const [username, setUsername] = useState(user?.username || "");
  const [photo, setPhoto] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) return alert("Username is required");

    // Mock update since Fake Store API doesn't support profile updates
    const updatedUser = {
      ...user,
      username,
      photo: photo ? URL.createObjectURL(photo) : user.photo,
    };

    setUser(updatedUser); // Update context
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
    navigate(from, { replace: true });
  };

  if (!user) {
    return <div className="font-bold text-4xl text-choco">Loading profile...</div>;
  }

  return (
    <div>
  <Nav />
  <div className="h-188 flex justify-center items-center bg-cream sm:h-screen">
    <form
      onSubmit={handleSubmit}
      className="bg-mint/50 text-dark rounded-xl shadow-2xl p-10 space-y-6 max-w-md w-full"
    >
      <h2 className="text-center text-3xl font-bold">
        Update Your Profile
      </h2>

      <div>
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="Preview"
            className="w-24 h-24 mx-auto rounded-full mt-2 border-4 border-caramel"
          />
        ) : (
          <div className="w-24 h-24 mx-auto rounded-full bg-amber flex items-center justify-center text-white text-2xl mt-2">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <label htmlFor="username" className="font-semibold">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your fullname"
        className="bg-cream text-dark rounded p-2 w-full mt-2 mb-5 focus:ring-4 focus:ring-mint"
        required
      />

      <label htmlFor="photo" className="font-semibold">Profile Photo</label>
      <input
        type="file"
        id="photo"
        onChange={(e) => setPhoto(e.target.files[0])}
        className="bg-cream text-dark rounded p-2 w-full mt-2 mb-5 focus:ring-4 focus:ring-mint"
      />

      <button
        type="submit"
        className="bg-dark text-white text-center p-2 mt-5 rounded-3xl text-xl w-full transition-transform hover:scale-95 hover:bg-choco"
      >
        Update
      </button>
    </form>
  </div>
</div>
  );
};

export default UpdateProfile;