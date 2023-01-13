import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ user }) => {
  return (
    <>
      <Container>
        <img src={Robot} alt="robot" />
        <h1>
          Welcome, <span>{user.username}!</span>
        </h1>
        <h3>Select a chat to start messenging</h3>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #c8c4c4;
  width: 100%;
  transition: all 5s ease-in-out;
  img {
    height: 20rem;
  }
  span {
    color: #535ffd;
  }

  @media screen and (max-width: 350px) {
    font-size: 0.8rem;
    img {
      height: 15rem;
    }
  }
`;

export default Welcome;
