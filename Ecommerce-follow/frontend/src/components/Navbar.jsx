import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    // Use the async thunk to properly clear cookies on the server
    dispatch(logoutUser()).then(() => {
      navigate('/');
    });
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-gray-200"
          onClick={() => navigate('/')}
        >
          Ecommerce
        </div>

        {/* Navigation Links - Only show when authenticated */}
        {isAuthenticated && (
          <div className="flex space-x-6">
            <p
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate('/addproducts')}
            >
              Add Products
            </p>
            <p
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate('/myproducts')}
            >
              My Products
            </p>
            <p
              className="cursor-pointer hover:text-gray-200 relative"
              onClick={() => navigate('/cart')}
            >
              Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </p>
            <p
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate('/myorders')}
            >
              My Orders
            </p>
            <p
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate('/user')}
            >
              Profile
            </p>
          </div>
        )}

        {/* Auth Links */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              {user && (
                <div className="flex items-center mr-4">
                  <span className="mr-2">Hello, {user.name}</span>
                  {user.userImage && (
                    <img
                      src={user.userImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              )}
              <button
                className={`bg-white text-blue-600 px-4 py-2 rounded-md ${
                  status === 'loading' ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
                onClick={handleLogout}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;