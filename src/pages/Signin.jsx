import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { toast, ToastContainer } from "react-toastify";  // ✅ import ToastContainer
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/signin", Inputs);

      if (response.data && response.data.others) {
        sessionStorage.setItem("id", response.data.others._id);
        dispatch(authActions.login());

        toast.success("✅ Login successful! Redirecting...");
        setTimeout(() => {
          history("/");
        }, 1500);
      } else {
        toast.error("⚠️ Invalid credentials!");
      }
    } catch (error) {
      toast.error("❌ Something went wrong! Check your server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back 👋</h2>
        <p className="text-gray-200 text-center mt-2">Login to continue to TodoApp</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
              value={Inputs.email}
              onChange={change}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={change}
              value={Inputs.password}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-xl transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-200 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-300 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* ✅ ToastContainer yahin rakha hai */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
