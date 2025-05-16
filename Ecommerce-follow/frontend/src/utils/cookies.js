import Cookies from 'js-cookie';

// Cookie names
export const TOKEN_COOKIE_NAME = 'jwt_token';
export const USER_COOKIE_NAME = 'user_data';

// Cookie options
const cookieOptions = {
  expires: 7, // 7 days
  path: '/',
  secure: import.meta.env.PROD, // Only use secure in production
  sameSite: 'lax' // Use 'lax' for cross-site requests
};

/**
 * Set the JWT token in a cookie
 * @param {string} token - The JWT token
 */
export const setTokenCookie = (token) => {
  Cookies.set(TOKEN_COOKIE_NAME, token, cookieOptions);
};

/**
 * Get the JWT token from the cookie
 * @returns {string|null} The JWT token or null if not found
 */
export const getTokenCookie = () => {
  return Cookies.get(TOKEN_COOKIE_NAME) || null;
};

/**
 * Remove the JWT token cookie
 */
export const removeTokenCookie = () => {
  Cookies.remove(TOKEN_COOKIE_NAME, { path: '/' });
};

/**
 * Set user data in a cookie
 * @param {Object} userData - The user data object
 */
export const setUserCookie = (userData) => {
  Cookies.set(USER_COOKIE_NAME, JSON.stringify(userData), cookieOptions);
};

/**
 * Get user data from the cookie
 * @returns {Object|null} The user data object or null if not found
 */
export const getUserCookie = () => {
  const userDataStr = Cookies.get(USER_COOKIE_NAME);
  if (!userDataStr) return null;
  
  try {
    return JSON.parse(userDataStr);
  } catch (error) {
    console.error('Error parsing user data from cookie:', error);
    return null;
  }
};

/**
 * Remove the user data cookie
 */
export const removeUserCookie = () => {
  Cookies.remove(USER_COOKIE_NAME, { path: '/' });
};

/**
 * Clear all auth cookies
 */
export const clearAuthCookies = () => {
  removeTokenCookie();
  removeUserCookie();
};
