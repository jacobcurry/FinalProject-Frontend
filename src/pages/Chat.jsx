import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, getFriendsRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import AddUser from "../components/AddUser";
import { io } from "socket.io-client";
import { GiHamburgerMenu } from "react-icons/gi";

const Chat = () => {
  const socket = useRef();

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [closeSideBar, setCloseSideBar] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const closeContacts = () => {
    setCloseSideBar(!closeSideBar);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setIsLoaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.user_id);
    }
  }, [currentUser]);

  const getAllUsers = async () => {
    if (currentUser) {
      if (currentUser.isavatarimageset) {
        const { data } = await axios.get(
          `${allUsersRoute}/${currentUser.user_id}`
        );
        setContacts(data);
      } else {
        navigate("/setavatar");
      }
    }
  };

  const getFriends = async () => {
    if (currentUser) {
      if (currentUser.isavatarimageset) {
        const { data } = await axios.get(
          `${getFriendsRoute}/${currentUser.user_id}`
        );
        if (data.status === false) {
          return;
        }
        setFriends(data.friends);
      }
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    getAllUsers();
    getFriends();
  }, [currentUser]);

  return (
    <>
      <Container>
        <GiHamburgerMenu
          onClick={closeContacts}
          className={closeSideBar ? "hamburger" : "hambuger ham-open"}
          color="#c8c4c4"
          size="40px"
        />
        <Contacts
          closeContacts={closeContacts}
          contacts={contacts}
          friends={friends}
          currentUser={currentUser}
          changeChat={handleChatChange}
          closeSideBar={closeSideBar}
          setShowUsers={setShowUsers}
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
        />
        {showUsers ? (
          <AddUser
            getFriends={getFriends}
            contacts={contacts}
            currentUser={currentUser}
            setShowUsers={setShowUsers}
            setCloseSideBar={setCloseSideBar}
            socket={socket}
          />
        ) : isLoaded && currentChat === undefined ? (
          <Welcome user={currentUser} />
        ) : (
          <ChatContainer
            socket={socket}
            currentUser={currentUser}
            currentChat={currentChat}
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 100;
  height: 100%;
  width: 100%;
  display: flex;

  .hamburger {
    display: none;
  }

  .ham-open {
    position: absolute;
    display: block;
    cursor: pointer;
    margin: 1rem;
  }
`;

export default Chat;
