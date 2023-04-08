/* eslint-disable eqeqeq */
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

interface IInputStyle {
  message?: string;
  maxwidth?: string;
  type?: string;
  iconposition?: "left" | "right";
}

export const InputStyled = styled(motion.div)<IInputStyle>`
  box-sizing: border-box;

  position: relative;

  width: 100%;
  height: 70px;
  max-width: ${({ maxwidth }) => (maxwidth ? maxwidth : "350px")};

  display: flex;
  align-items: flex-end;

  #input__placeholder {
    font-family: "Raleway";
    font-weight: 500;
    font-size: 16px;

    height: 30px;

    color: #2a2a2a;

    background: rgba(199, 199, 204, 0.2);

    z-index: 1;

    /* padding: 5px 5px 10px 5px; */

    position: absolute;
    left: 5px;
    bottom: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    box-sizing: border-box;

    position: relative;

    border: 2px solid var(--color-frenchGray);
    outline: 0;
    border-radius: 8px;

    z-index: 1;
    height: 40px;
    width: 100%;
    max-width: ${({ maxwidth }) => (maxwidth ? maxwidth : "350px")};

    padding: ${({ iconposition }) =>
      iconposition == "left"
        ? "10px 10px 10px 40px"
        : iconposition == "right"
        ? "10px 40px 10px 10px"
        : "10px 10px"};

    background-color: var(--color-white);
    color: var(--color-manatee);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

    font-size: var(--font-size-p6);

    font-family: "Raleway";
    color: #1a1a1a;
    font-weight: 500;

    ::placeholder {
      color: ${({ message }) => (message ? "#FA505A" : "#949499")};
    }
  }
`;

interface IOrganization {
  type?: "text" | "password" | "price" | "phone";
}

export const Organization = styled(motion.div)<IOrganization>`
  box-sizing: border-box;

  position: relative;

  width: 100%;

  margin-top: 10px;

  display: flex;
  align-items: flex-end;
`;

interface IPropsButtonIcon {
  iconposition?: "left" | "right";
}

export const ButtonIcon = styled(motion.button)<IPropsButtonIcon>`
  box-sizing: border-box;

  position: absolute;
  bottom: 5px;

  z-index: 20;

  ${({ iconposition }) =>
    iconposition == "right"
      ? css`
          right: 0px;
        `
      : css`
          left: 0px;
        `}

  cursor:pointer;

  color: var(--color-manatee);

  height: 40px;

  z-index: 2;

  border: none;
  padding: 10px;
  margin: none;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway";
  font-size: 15px;

  border-radius: 8px;

  background-color: transparent;

  svg {
    font-size: 25px;
  }
`;
