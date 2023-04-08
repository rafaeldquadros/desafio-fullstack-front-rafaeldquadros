import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledForm = styled(motion.form)`
  width: 30%;
  height: max-content;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #e8e8ec;

  padding: 20px 20px;

  border-radius: 8px;

  h2 {
    box-sizing: border-box;
    font-family: Raleway;
    font-weight: 700;
    font-size: 22px;
    color: rgb(26, 26, 26);
    align-self: flex-start;
  }
`;
