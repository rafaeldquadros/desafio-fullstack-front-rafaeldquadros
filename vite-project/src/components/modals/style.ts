import { motion } from "framer-motion";
import styled from "styled-components";

export const StyleBackgroundModal = styled(motion.div)`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  background: rgba(0, 0, 0, 0.5);
`;

export const StyledButtonClose = styled.button`
  border: none;
  background-color: transparent;
  width: 40px;
  height: 40px;
  cursor: pointer;

  position: absolute;
  top: 3%;
  right: 3%;

  svg {
    min-width: 100%;
    height: 100%;
  }
`;
