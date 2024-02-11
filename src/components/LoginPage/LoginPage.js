import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    

    // Call the onLogin function passed from the parent component
    // to handle the login action
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
        <button type="submit">Login</button>
        <button type="button" onClick={setDefaultLogin}>Default Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
