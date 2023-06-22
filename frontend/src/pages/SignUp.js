import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } from "mdb-react-ui-kit";

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
    
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2">Sign Up</h2>
              <p className="text-white-50 mb-5">
                Create a new account to proceed
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                type="email"
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

<MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Confirm Password"
                type="password"
                size="lg"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              <MDBBtn type="submit" onClick={handleSubmit} outline className="mx-2 px-5 my-3" color="white" size="lg">
                Sign Up
              </MDBBtn>

              <div>
                <p className="mt-3">
                  Already have an account?<br />
                  <a href="/login" className="text-white-50 fw-bold">
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignUp;