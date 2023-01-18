import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { searchedUsersRoute, setFriendRoute } from "../utils/APIRoutes";

const AddUser = ({
  contacts,
  currentUser,
  setShowUsers,
  setCloseSideBar,
  getFriends,
  socket,
}) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [searchedUser, setSearchedUser] = useState("");
  const [returnedUsers, setReturnedUsers] = useState([]);

  const getSearchedUsers = async () => {
    if (searchedUser.length === 0) {
      return false;
    }
    const { data } = await axios.get(
      `${searchedUsersRoute}/${currentUser.user_id}/${searchedUser}`
    );
    setReturnedUsers(data);
  };

  const setFriend = async (friend_id) => {
    const { data } = await axios.post(
      `${setFriendRoute}/${currentUser.user_id}`,
      { friend_id }
    );
    if (data.status === false) {
      toast.info(data.msg, toastOptions);
      setCloseSideBar(true);
    } else {
      getFriends();
      setCloseSideBar(true);
    }
  };

  useEffect(() => {
    getSearchedUsers();
  }, [searchedUser]);

  return (
    <>
      <Container>
        <p className="title">Message Someone New</p>
        <hr />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="user"
            value={searchedUser}
            onChange={(e) => setSearchedUser(e.target.value)}
            placeholder="Username..."
          />
        </form>
        {searchedUser.length > 0 && (
          <div className="searched-contacts">
            {returnedUsers.length === 0 ? (
              <p className="no-matches">No matches for {searchedUser}</p>
            ) : (
              returnedUsers.map((contact, index) => {
                return (
                  <div
                    onClick={() => setFriend(contact.user_id)}
                    className="each-contact"
                    key={index}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarimage}`}
                      alt="avatar"
                    />
                    {contact.username}
                  </div>
                );
              })
            )}
          </div>
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #c8c4c4;
  width: 100%;
  margin-top: 5rem;
  .title {
    font-size: 2rem;
    margin-top: 1rem;
    max-width: 90%;
  }
  hr {
    max-width: 90%;
    width: 450px;
    margin: 0.5rem 0;
  }
  @media screen and (min-width: 300px) and (max-width: 400px) {
    .title {
      text-align: center;
    }
  }
  form {
    display: flex;
    max-width: 90%;
    width: 450px;
    flex-direction: column;
    gap: 2rem;
    background-color: transparent;
    border-radius: 2rem;
    margin-top: 1rem;
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
  }

  .searched-contacts {
    max-width: 90%;
    margin-top: -0.2rem;
    width: 450px;
    max-height: 200px;
    background-color: #1a1a1a;
    border: 0.1rem solid #c8c4c4;
    border-radius: 1rem;
    padding: 0.8rem 0;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
      background-color: #454545;
      border: 4px solid transparent;
      border-radius: 8px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar {
      width: 16px;
    }

    .no-matches {
      padding: 0.5rem 1rem;
    }

    .each-contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      &:hover {
        background-color: #535ffd;
      }
      img {
        height: 1.5rem;
      }
    }
  }
`;

export default AddUser;
