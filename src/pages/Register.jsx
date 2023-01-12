import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/setavatar");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords must match", toastOptions);
      return false;
    } else if (username.length < 5) {
      toast.error("Username should be at least 5 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>space chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username..."
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password..."
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <span>
            already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: transparent;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 70px;
      padding: 0;
      margin: 0;
    }
    h1 {
      color: #c8c4c4;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    max-width: 90%;
    flex-direction: column;
    gap: 2rem;
    background-color: transparent;
    border-radius: 2rem;
    padding: 3rem 5rem;
    z-index: 100;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #c8c4c4;
      border-radius: 0.4rem;
      color: #c8c4c4;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #535ffd;
        outline: none;
      }
    }
    button {
      background-color: #535ffd;
      color: #c8c4c4;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #8088ff;
      }
    }
    span {
      color: #c8c4c4;
      text-transform: uppercase;
      a {
        color: #535ffd;
        text-transform: none;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #8088ff;
        }
      }
    }
  }
  @media screen and (min-width: 300px) and (max-width: 600px) {
    form {
      padding: 1.5rem 2.5rem;
    }
  }
  @media screen and (min-width: 300px) and (max-width: 405px) {
    form {
      padding: 1.5rem 1.5rem;
    }
    .brand {
      h1 {
        width: 45%;
      }
    }
  }
  @media screen and (min-width: 300px) and (max-width: 420px) {
    span {
      text-align: center;
    }
  }
`;

export default Register;
