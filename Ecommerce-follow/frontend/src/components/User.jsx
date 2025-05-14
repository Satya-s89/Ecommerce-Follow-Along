import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAddresses } from "../store/slices/userSlice";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data and addresses from Redux store
  const { userData, addresses, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch addresses using Redux thunk
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* User Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto">
          {userData ? (
            <>
              {/* User Image */}
              <img
                src={userData.userImage}
                alt="User"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500"
              />

              {/* User Name */}
              <h3 className="text-2xl font-bold text-gray-800 mt-4">{userData.name}</h3>

              {/* Add Address Button */}
              <button
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => {
                  navigate("/user-address");
                }}
              >
                Add Address
              </button>

              {/* User Addresses Section */}
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
                Your Addresses
              </h2>

              {/* Loading State */}
              {status === 'loading' && (
                <div className="text-center py-4">
                  <p className="text-gray-600">Loading addresses...</p>
                </div>
              )}

              {/* Error State */}
              {status === 'failed' && (
                <div className="text-center py-4">
                  <p className="text-red-500">Error: {error}</p>
                </div>
              )}

              {/* Addresses List */}
              {status === 'succeeded' && (
                <>
                  {addresses.length > 0 ? (
                    <div className="space-y-4">
                      {addresses.map((address, idx) => (
                        <div
                          key={address._id}
                          className="bg-gray-100 p-4 rounded-md shadow-sm border border-gray-300"
                        >
                          <h3 className="text-lg font-semibold text-blue-600 mb-2">
                            {`Address ${idx + 1}`}
                          </h3>
                          <p className="text-gray-700">
                            <span className="font-medium">Country:</span> {address.country}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">City:</span> {address.city}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Address 1:</span> {address.address1}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Address 2:</span> {address.address2}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">ZIP Code:</span> {address.zipCode}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No addresses found.</p>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-red-500">Please log in to view your profile.</p>
              <button
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;