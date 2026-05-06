import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/signin", { email, password });
      
      // Console mein check karein ki token aa raha hai ya nahi
      console.log("SIGNIN RESPONSE:", res.data);

      if (res.data.token) {
        // ✅ Token ko localStorage mein save karein
        localStorage.setItem("token", res.data.token);
        // Optional: User details save karein
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Signed in successfully!");
        
        // Redirect to home or previous page
        navigate("/");
        // Force refresh taaki Navbar update ho jaye
        window.location.reload(); 
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("SIGNIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign In</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Email Address</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;