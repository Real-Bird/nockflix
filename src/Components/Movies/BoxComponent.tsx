import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../../utils";

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: relative;
  width: 100%;
  top: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

interface IBoxPops {
  id: number;
  backdropPath: string;
  title: string;
  type: string;
  sliderName: string;
}

function BoxComponent({ id, backdropPath, title, type, sliderName }: IBoxPops) {
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/${type}/${id}`);
  };
  return (
    <Box
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      onClick={() => onBoxClicked(id)}
      transition={{ type: "tween" }}
      $bgPhoto={makeImagePath(backdropPath || "", "w500")}
      layoutId={`${sliderName}_${id}`}
    >
      <Info variants={infoVariants}>
        <h4>{title}</h4>
      </Info>
    </Box>
  );
}

export default BoxComponent;
