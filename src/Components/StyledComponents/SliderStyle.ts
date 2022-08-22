import { motion } from "framer-motion";
import styled from "styled-components";

export const SliderTitle = styled.h1`
  padding: 10px;
  font-size: 34px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.eng};
`;

export const Slider = styled.div`
  position: relative;
  top: -140px;
  height: 300px;
  button {
    position: absolute;
    top: 40%;
    margin: 20px;
    width: 3rem;
    height: 4rem;
    background-color: rgba(229, 229, 229, 0.7);
    opacity: 0.4;
    border: transparent;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
