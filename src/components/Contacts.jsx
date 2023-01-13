import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { AiFillCaretDown, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Contacts = ({
  contacts,
  currentUser,
  changeChat,
  closeContacts,
  closeSideBar,
}) => {
  const navigate = useNavigate();

  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [showContactsSection, setShowContactsSection] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarimage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUsername && (
        <Container
          className={closeSideBar ? "" : "close-sidebar"}
          id="container"
        >
          <div className="current-user">
            <div className="user-info" onClick={() => navigate("/profile")}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />

              <h2>{currentUsername}</h2>
            </div>
            <AiOutlineClose
              className="close-btn"
              onClick={closeContacts}
              color="#c8c4c4"
              size="40px"
            />
          </div>

          <div className="contacts">
            <div className="messages-div">
              <p
                onClick={() => setShowContactsSection(!showContactsSection)}
                className="your-messages"
              >
                {" "}
                <AiFillCaretDown
                  className={`${
                    !showContactsSection ? "rotateCaret" : "setCaret"
                  }`}
                />
                Your messages
              </p>
              <AiOutlinePlus className="hide-plus plus" />
            </div>
            {showContactsSection &&
              contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      if (window.innerWidth < 1000) {
                        closeContacts();
                      }
                      changeCurrentChat(index, contact);
                    }}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarimage}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h2>space chat</h2>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  background-color: #0d0d30;
  height: 100%;
  width: 100%;
  max-width: 320px;
  transition: all 0.7s;
  z-index: 100;
  @media screen and (max-width: 1000px) {
    position: absolute;
  }
  @media screen and (min-width: 1000px) {
    .close-btn {
      display: none;
    }
  }
  .close-btn {
    cursor: pointer;
    position: absolute;
    left: 270px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 50px;
      padding: 0;
      margin: 0;
    }
    h2 {
      color: #c8c4c4;
      text-transform: uppercase;
    }
  }

  .messages-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      .hide-plus {
        display: block;
      }
    }
  }

  .plus {
    cursor: pointer;
    color: #c8c4c4;
    margin-right: 0.8rem;
    font-size: 1.5rem;
  }
  .hide-plus {
    display: none;
  }

  .close-div {
    display: flex;
    justify-content: flex-end;
    padding: 0.1rem;
  }

  .your-messages {
    color: #c8c4c4;
    display: flex;
    padding: 0.5rem 0;
    margin-left: 0.8rem;
    margin-right: auto;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
  }

  .rotateCaret {
    animation-name: rotateCaret;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  .setCaret {
    animation-name: setCaret;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes rotateCaret {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-90deg);
    }
  }
  @keyframes setCaret {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 3rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      cursor: pointer;
      img {
        height: 2.5rem;
      }
      h2 {
        color: white;
      }
    }
  }
`;

export default Contacts;
