import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef(null);

  const getMessages = async () => {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  };

  useEffect(() => {
    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.length === 0
              ? null
              : messages.map((message) => {
                  return (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div
                        className={`message ${
                          message.fromSelf ? "sended" : "recieved"
                        }`}
                      >
                        <div className="content">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  transition: all 1s;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    .user-details {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
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
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #fff;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #1982fc;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #3a3a3a;
      }
    }
  }
`;

export default ChatContainer;
