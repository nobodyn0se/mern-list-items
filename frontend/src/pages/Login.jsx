import React, { useState, useEffect } from "react";

import '../styles/Login.css';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import { useNavigate } from "react-router";

import { useAuthProvider } from "../context/AuthContext";

import Loader from '../components/Loader';

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
    <Loader />
  ) : (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2">Login</h2>
              <p className="text-white-50 mb-5">
                Enter your username and password to continue
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Username"
                type="text"
                size="lg"
                value={username}
                onChange={handleUsernameChange}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                type="password"
                size="lg"
                value={password}
                onChange={handlePasswordChange}
              />

              <MDBBtn type="submit" onClick={handleSubmit} outline className="mx-2 px-5 my-3" color="white" size="lg">
                Login
              </MDBBtn>

              <div>
                <p className="mt-3">
                  Create a new account<br />
                  <a href="/signup" className="text-white-50 fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;
