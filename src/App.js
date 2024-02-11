import React, { useState } from 'react';
import ShootingStarNavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage';
import NasaApodComponent from './components/NasaApodComponent/NasaApodComponent';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    
    // For demo purposes, compare the entered username and password with default credentials
    if (username === 'demo_user' && password === 'demo_password') {
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
    } else {
      alert('Invalid username or password'); // Display an alert for demo purposes
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false); // Set isLoggedIn to false upon logout
  };

  return (
    <div className="App">
      <header className="App-header">
        <ShootingStarNavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;
