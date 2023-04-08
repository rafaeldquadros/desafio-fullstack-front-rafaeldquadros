import styled from "styled-components";

export const StyledRegister = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    cursor: pointer;
    font-family: Inter;
    font-weight: 500;
    font-size: 12px;
    margin-right: 5px;
  }

  a {
    cursor: pointer;

    border: none;
    background-color: transparent;

    font-family: Raleway;
    font-weight: 500;
    font-size: 12px;
    color: rgb(212, 166, 28);

    text-underline-offset: 3px;
    text-decoration: none;
  }
`;
