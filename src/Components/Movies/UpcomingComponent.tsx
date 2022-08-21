import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getUpcomingMovies, IGetMoviesResult } from "../../apis";
import BigMovieComponent from "./BigMovieComponent";
import BoxComponent from "./BoxComponent";

const Slider = styled.div`
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

const SliderTitle = styled.h1`
  padding: 10px;
  font-size: 34px;
  font-weight: bold;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const offset = 6;

const rowVariants = {
  hidden: (direction: number) => {
    return {
      x: direction < 0 ? -window.outerWidth - 5 : window.outerWidth + 5,
    };
  },
  visible: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -window.outerWidth - 5 : window.outerWidth + 5,
    };
  },
};

function UpcomingComponent() {
  const { data } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const [direction, setDirection] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const bigMovieMatch = useMatch("/movies/:movieId");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => `${movie.id}` === bigMovieMatch.params.movieId
    );
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <>
      <Slider>
        <SliderTitle>Upcoming Movies</SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            custom={direction}
            transition={{ type: "tween", duration: 1 }}
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <BoxComponent
                  key={movie.id}
                  id={movie.id}
                  backdropPath={movie.backdrop_path}
                  title={movie.title}
                />
              ))}
          </Row>
        </AnimatePresence>
        <button
          style={{ left: 0 }}
          onClick={decreaseIndex}
          onMouseOver={() => setDirection(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          style={{ right: 0 }}
          onClick={increaseIndex}
          onMouseOver={() => setDirection(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Slider>
      {bigMovieMatch && clickedMovie && (
        <BigMovieComponent
          title={clickedMovie.title}
          backdrop_path={clickedMovie.backdrop_path}
          overview={clickedMovie.overview}
          movieId={`${bigMovieMatch.params.movieId}`}
        />
      )}
    </>
  );
}

export default UpcomingComponent;
