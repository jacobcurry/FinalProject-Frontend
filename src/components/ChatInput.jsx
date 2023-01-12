import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const closeEmojiRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, e) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(() => {
    const handleShowEmoji = (e) => {
      if (!closeEmojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleShowEmoji);
  }, [closeEmojiRef]);

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji" ref={closeEmojiRef}>
            <BsEmojiSmileFill onClick={handleEmojiPickerShow} />
            {showEmojiPicker && (
              <EmojiPicker
                width="285px"
                theme="dark"
                onEmojiClick={handleEmojiClick}
              />
            )}
          </div>
        </div>
        <form onSubmit={sendChat} className="input-container">
          <input
            type="text"
            placeholder="Message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  width: 100%;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 2rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -475px;
      }
    }
  }
  .input-container {
    width: 100%;
    max-width: 800px;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff30;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #1982fc;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1982fc;
      border: none;
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  @media screen and (max-width: 800px) {
    button {
      padding: 0.3rem 1rem !important;
    }
  }
`;

export default ChatInput;
