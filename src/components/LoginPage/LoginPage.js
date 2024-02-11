import React, { useState } from 'react';

// LoginPage component for user authentication
const LoginPage = ({ onLogin }) => {
  // State variables for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the onLogin function passed from the parent component
    // to handle the login action with provided username and password
    onLogin(username, password);
  };

  // Function to set default login credentials
  const setDefaultLogin = () => {
    setUsername('demo_user'); // Set default username
    setPassword('demo_password'); // Set default password
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        {/* Password input */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit">Login</button>
        {/* Button to set default login credentials */}
        <button type="button" onClick={setDefaultLogin}>Default Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
