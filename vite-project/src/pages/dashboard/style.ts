import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledBoxCategoriesAndBrandsAdmin = styled.section`
  width: 100%;
  max-width: 700px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  position: absolute;
  top: 1%;

  margin-bottom: 30px;

  @media (max-width: 700px) {
    margin-top: 40px;
  }
`;

export const StyledCategoriesTitle = styled.div`
  width: 100%;
  height: 80px;

  margin-top: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  h1 {
    margin-left: 20px;
  }
`;

export const StyledButtonMore = styled.button`
  width: 40px;
  height: 40px;

  cursor: pointer;

  margin-right: ${({ color }) =>
    color === "gold"
      ? "0px"
      : color === "red"
      ? "0px"
      : color === "noMarginRight"
      ? "0px"
      : "20px"};

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ color }) =>
    color === "goldOne"
      ? "#D4A61C"
      : color === "gold"
      ? "#D4A61C"
      : color === "red"
      ? "#EE3232"
      : "#1C5BD4"};

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  img {
    max-width: 30px;
    max-height: 30px;
  }
`;

export const StyledBoxButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 700px) {
    margin-bottom: 20px;
    margin-right: 0px;
  }
`;

export const StyledBoxButtonsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 20px;
`;

export const StyledWellcomeDesk = styled.section`
  width: 100%;
  height: max-content;
  margin-top: 45px;
  margin-bottom: 20px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  position: relative;
  z-index: 0;

  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;

  color: #2a2a2a;

  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  h2 {
    padding: 20px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

export const StyledBoxListAndSearch = styled(motion.div)`
  width: 100%;
  max-width: 700px;
  height: max-content;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  background-color: #ffffff;
`;

export const StyledList = styled(motion.ul)`
  padding: 10px 0px;

  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 240px;
  margin-top: 10px;
  margin-bottom: 10px;

  ::-webkit-scrollbar {
    background-color: #f5f5f5;
    border-radius: 0px 8px 8px 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c7c7cc;
  }

  li {
    background-color: #ffffff;
    border-radius: 4px;

    width: 100%;
    min-height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 10px 0px;

    @media (max-width: 700px) {
      flex-direction: column;
    }

    a {
      margin-left: 20px;

      font-family: "Raleway";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;

      color: #2a2a2a;

      text-decoration: none;
      @media (max-width: 700px) {
        height: 50px;
        margin-left: 0px;

        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    background: #f5f5f5;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }
`;

export const StyledBoxUserButtons = styled.section`
  display: flex;
  padding: 10px;

  position: absolute;
  right: 0%;
  bottom: 0%;
`;
