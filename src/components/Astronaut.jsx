import React from "react";
import styled from "styled-components";

const Astronaut = () => {
  return (
    <Container className="astronaut">
      <div className="head">
        <div></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default Astronaut;
