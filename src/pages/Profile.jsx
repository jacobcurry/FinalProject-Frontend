import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logout from "../components/Logout";
import axios from "axios";
import { EditUserRoute } from "../utils/APIRoutes";

const Profile = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);

  const [values, setValues] = useState();

  const handleValidation = () => {
    const { email, username } = values;
    if (username === "") {
      toast.error("Username is required", toastOptions);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username } = values;
      const { data } = await axios.post(
        `${EditUserRoute}/${currentUser.user_id}`,
        {
          username,
          email,
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      setValues({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        <div className="header">
          <div className="back-div" onClick={() => navigate("/")}>
            <BiArrowBack
              onClick={() => navigate("/")}
              color="#c8c4c4"
              size="40px"
            />
            <span>to chat</span>
          </div>
          <p className="profile-title">Profile</p>
          {currentUser && (
            <div className="current-user">
              <p>{currentUser.username}</p>
              <Logout />
            </div>
          )}
        </div>
        <FormContainer>
          {currentUser && (
            <form onSubmit={handleSubmit}>
              <div className="brand">
                <h1>Edit Info</h1>
                <hr />
              </div>
              <div className="change-avatar">
                {currentUser && (
                  <img
                    src={`data:image/svg+xml;base64,${currentUser.avatarimage}`}
                    alt="avatar"
                  />
                )}
                <p onClick={() => navigate("/setavatar")}>New Avatar?</p>
              </div>
              <input
                type="text"
                placeholder={currentUser.username}
                defaultValue={currentUser.username}
                name="username"
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder={currentUser.email}
                defaultValue={currentUser.email}
                name="email"
                onChange={handleChange}
              />

              <button type="submit">Save</button>
            </form>
          )}
        </FormContainer>
        <ToastContainer />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  height: 100vh;
  z-index: 100;
  width: 100%;
  color: #c8c4c4;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .header {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
  }
  .back-div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .profile-title {
    font-size: 2rem;
    display: flex;
  }

  .current-user {
    display: flex;
    align-items: center;
    gap: 1rem;
    p {
      font-size: 1.2rem;
    }
    img {
      height: 2.5rem;
    }
  }

  .change-avatar {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    p {
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 300px) and (max-width: 500px) {
    .current-user {
      img {
        display: none;
      }
    }
    span {
      display: none;
    }
    .profile-title {
      display: none;
    }
  }
  @media screen and (min-width: 300px) and (max-width: 400px) {
  }
  @media screen and (min-width: 1200px) {
    font-size: 1.5rem;
    .profile-title {
      font-size: 3rem;
    }
    .current-user {
      p {
        font-size: 1.5rem;
      }
    }
  }
`;
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
    justify-content: center;
    flex-direction: column;
    h1 {
      font-weight: 400;
      font-size: 2.5rem;
    }
    hr {
      width: 100%;
    }
  }
  form {
    display: flex;
    max-width: 90%;
    flex-direction: column;
    gap: 2rem;
    background-color: transparent;
    border-radius: 2rem;

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
  }
`;
export default Profile;
