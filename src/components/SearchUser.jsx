import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";

const SearchUser = () => {
  return (
    <Container>
      <div className="search-box">
        <input
          type="text"
          placeholder="Message someone new..."
          className="search-input"
        />
        <button className="search-btn">
          <BiSearchAlt color="#c8c4c4" size="30px" />
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .search-box {
    display: flex;
    justify-content: center;
    margin: 0 auto 1rem auto;
    width: 90%;
    background-color: transparent;
    border-radius: 2rem;
    z-index: 100;
    input {
      color: #c8c4c4;
      background-color: transparent;
      width: 100%;
      border: none;
      border-top: 0.1rem solid #c8c4c4;
      border-bottom: 0.1rem solid #c8c4c4;
      border-left: 0.1rem solid #c8c4c4;
      padding: 1rem;
      font-size: 1rem;
    }
    button {
      background-color: transparent;
      border: none;
      border-top: 0.1rem solid #c8c4c4;
      border-bottom: 0.1rem solid #c8c4c4;
      border-right: 0.1rem solid #c8c4c4;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`;

export default SearchUser;
