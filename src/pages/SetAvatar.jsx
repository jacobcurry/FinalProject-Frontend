import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import Logo from "../assets/logo.png";
import { Buffer } from "buffer";
import { BiRefresh } from "react-icons/bi";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user.user_id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isavatarimageset = true;
        user.avatarimage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  const getAvatars = async () => {
    setBtnIsLoading(true);
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 10000)}?apikey=ljvtzCO91AkYy3`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
    setBtnIsLoading(false);
  };

  useEffect(() => {
    getAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="container">
            <div className="moon">
              <div className="crater crater1"></div>
              <div className="crater crater2"></div>
              <div className="crater crater3"></div>
              <div className="crater crater4"></div>
              <div className="crater crater5"></div>
              <div className="shadow"></div>
            </div>
            <div className="orbit">
              <img className="rocket-logo" src={Logo} alt="logo" />
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar...</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="two-btns">
            <button onClick={getAvatars} className={`refresh`}>
              New Avatars
              <BiRefresh
                className={`${btnIsLoading ? "btn-loading" : ""}`}
                size="45px"
              />
            </button>
            <button className="submit-btn" onClick={setProfilePicture}>
              Set as Profile Picture
            </button>
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .title-container {
    z-index: 100;
    h1 {
      color: white;
    }
  }
  .avatars {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 100;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        cursor: pointer;
      }
    }

    .selected {
      border: 0.4rem solid #535ffd;
    }
  }

  .two-btns {
    z-index: 100;
    display: flex;
    gap: 1rem;
  }

  .refresh {
    z-index: 100;
    background-color: #535ffd;
    color: white;
    padding: 0.5rem 2rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #8088ff;
    }
  }

  .btn-loading {
    animation: loading 1s infinite;
  }
  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }

  .submit-btn {
    z-index: 100;
    background-color: #535ffd;
    color: white;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #8088ff;
    }
  }
  @media screen and (min-width: 300px) and (max-width: 650px) {
    .avatars {
      grid-template-columns: 1fr 1fr;
    }
    .two-btns {
      flex-direction: column;
    }
    .refresh {
      padding: 0.2rem 2rem;
    }
  }
`;

export default SetAvatar;
