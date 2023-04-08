import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface IPropsButton {
  size?: "small" | "large" | "medium";
  color: "gold" | "red" | "blue";
  maxwidth?: string;
  line?: boolean;
  position?: "center" | "left";
  margin?: string;
}

export const StyledButton = styled(motion.button)<IPropsButton>`
  box-sizing: border-box;

  width: 100%;
  height: ${({ size }) =>
    size === "small" || size === "medium" ? "36px" : "60px"};

  border: 2px solid
    ${({ color }) =>
      color === "gold"
        ? "#D4A61C"
        : color === "red"
        ? "#EE3232"
        : color === "blue"
        ? "#1C5BD4"
        : "transparent"};
  border-radius: 4px;

  font-family: "Raleway";
  font-weight: 600;
  font-size: 14px;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  padding: ${({ size }) =>
    size === "small" || size === "medium" ? "5px" : "20px"};

  display: flex;
  justify-content: ${({ position }) =>
    position === "left" ? "flex-start" : "center"};
  align-items: center;

  cursor: pointer;

  ${({ margin }) =>
    margin
      ? css`
          margin: ${margin};
        `
      : css`
          margin-top: 30px;
        `}

  background-color: ${({ color, line }) =>
    line
      ? "transparent"
      : color === "gold"
      ? "#D4A61C"
      : color === "red"
      ? "#EE3232"
      : color === "blue"
      ? "#1C5BD4"
      : "transparent"};
  color: ${({ color, line }) =>
    line
      ? color === "gold"
        ? "#D4A61C"
        : color === "red"
        ? "#EE3232"
        : color === "blue"
        ? "#1C5BD4"
        : "#F5F5F5"
      : "#F5F5F5"};

  max-width: ${({ maxwidth, size }) =>
    maxwidth ? maxwidth : size === "small" ? "40px" : "100%"};

  @media (min-width: 500px) {
    font-size: 16px;
  }
`;
