import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
  h3 {
    font-size: 46px;
  }
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigRelease = styled.span`
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  span {
    margin: 5px;
  }
`;

interface BigMovieProps {
  sliderName: string;
  movieId: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

function BigMovieComponent({
  sliderName,
  movieId,
  backdrop_path,
  title,
  overview,
  vote_average,
  release_date,
}: BigMovieProps) {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(-1);
  const { scrollY } = useScroll();
  return (
    <AnimatePresence>
      <>
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, zIndex: 999 }}
        />
        <BigMovie
          layoutId={`${sliderName}_${movieId}`}
          style={{ top: scrollY.get() + 100, zIndex: 999 }}
        >
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>
              <h3>{title}</h3>
              <BigRelease>
                <span>Release : {release_date}</span>
                <span>Average : {vote_average}</span>
              </BigRelease>
            </BigTitle>
            <BigOverview>{overview}</BigOverview>
          </>
        </BigMovie>
      </>
    </AnimatePresence>
  );
}

export default BigMovieComponent;
