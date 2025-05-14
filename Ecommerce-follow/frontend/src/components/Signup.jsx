import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, clearSignupStatus } from "../store/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupStatus, error } = useSelector((state) => state.auth);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Clear signup status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearSignupStatus());
    };
  }, [dispatch]);

  // Handle successful signup
  useEffect(() => {
    if (signupStatus === 'succeeded') {
      alert("You successfully signed up! Please login.");
      navigate('/login');
    }
  }, [signupStatus, navigate]);

  function handleInput(e) {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!signupData.name) newErrors.name = "Name is required.";
    if (!signupData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!signupData.password) {
      newErrors.password = "Password is required.";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSignup(event) {
    event.preventDefault();

    if (!validateForm()) return;

    // Create signup data with image
    const signupFormData = {
      ...signupData,
      image: image
    };

    // Dispatch signup action
    dispatch(signupUser(signupFormData));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h2>

        {/* Server Error Message */}
        {signupStatus === 'failed' && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || "Signup failed. Please try again."}
          </div>
        )}

        {/* Image Preview */}
        {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Your Image
          </label>
          <input
            type="file"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setImage(event.target.files[0])}
            disabled={signupStatus === 'loading'}
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Name..."
            value={signupData.name}
            name="name"
            onChange={handleInput}
            disabled={signupStatus === 'loading'}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Email..."
            value={signupData.email}
            name="email"
            onChange={handleInput}
            disabled={signupStatus === 'loading'}
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
            value={signupData.password}
            name="password"
            onChange={handleInput}
            disabled={signupStatus === 'loading'}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={signupStatus === 'loading'}
          className={`w-full py-2 rounded-md transition ${
            signupStatus === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {signupStatus === 'loading' ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
