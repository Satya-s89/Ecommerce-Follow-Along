import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, clearAuthStatus } from "../store/slices/authSlice";
import { fetchCartItems } from "../store/slices/cartSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((state) => state.auth);

  // Get the redirect path from location state or default to home
  const from = location.state?.from || '/';

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Clear auth status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthStatus());
    };
  }, [dispatch]);

  // Handle successful login
  useEffect(() => {
    if (status === 'succeeded') {
      // Fetch cart items after successful login
      dispatch(fetchCartItems());

      // Show success message
      alert("You successfully logged in!");

      // Redirect to the page user was trying to access or home
      navigate(from);
    }
  }, [status, navigate, from, dispatch]);

  function handleInput(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleLogin(event) {
    event.preventDefault();

    if (!validateForm()) return;

    // Dispatch login action
    dispatch(loginUser(loginData));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        {/* Server Error Message */}
        {status === 'failed' && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || "Login failed. Please try again."}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Email..."
            value={loginData.email}
            name="email"
            onChange={handleInput}
            disabled={status === 'loading'}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={loginData.password}
            name="password"
            onChange={handleInput}
            disabled={status === 'loading'}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full py-2 rounded-md transition ${
            status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;