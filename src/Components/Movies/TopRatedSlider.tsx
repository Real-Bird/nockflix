import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getTopRatedMovies, IGetMoviesResult } from "../../apis";
import BigMovieComponent from "./BigMovieComponent";
import BoxComponent from "./BoxComponent";
import { Row, Slider, SliderTitle } from "../StyledComponents/SliderStyle";

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

function TopRatedSlider() {
  const { data } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopRatedMovies
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
        <SliderTitle>Top Rated Movies</SliderTitle>
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
                  type="movies"
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

export default TopRatedSlider;
