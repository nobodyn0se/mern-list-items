import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { useAuthProvider } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, token } = useAuthProvider();

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //send data to server
    await login(username, password);
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button onClick={handleSubmit} type="submit">
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginPage;
