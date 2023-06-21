import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import { useAuthProvider } from '../context/AuthContext';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signup, token, loading } = useAuthProvider();

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      
        //send data to server 
        await signup(username, password);

    } else {
      alert('Passwords do not match');
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    loading ? <p>Loading...</p> :
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;