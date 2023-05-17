import axios from 'axios';

/**
 * Set the authorization token for all subsequent axios requests.
 * @param {string} token - The JWT token to set in the authorization header.
 */
const setAuthToken = (token) => {
  if (token) {
    // Set the 'Authorization' header with the 'Bearer' token.
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Store the token in the browser's localStorage.
    localStorage.setItem('token', token);
  } else {
    // Remove the 'Authorization' header.
    delete axios.defaults.headers.common['Authorization'];

    // Remove the token from the browser's localStorage.
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
