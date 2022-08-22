import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useMatch } from "react-router-dom";
import { getTopRatedTvShow, IGetTvShowResult } from "../../apis";
import BigMovieComponent from "../Movies/BigMovieComponent";
import BoxComponent from "../Movies/BoxComponent";
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

function TopRatedShowSlider() {
  const { data } = useQuery<IGetTvShowResult>(
    ["tvShow", "topRated"],
    getTopRatedTvShow
  );
  const bigMovieMatch = useMatch("/tv/:showId");
  const [direction, setDirection] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalTvShows = data.results.length - 1;
      const maxIndex = Math.floor(totalTvShows / offset) - 1;
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
  const clickedShow =
    bigMovieMatch?.params.showId &&
    data?.results.find((show) => `${show.id}` === bigMovieMatch.params.showId);
  return (
    <React.Fragment>
      <Slider>
        <SliderTitle>Top Rated</SliderTitle>
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
              .map((show) => (
                <BoxComponent
                  key={show.id}
                  id={show.id}
                  backdropPath={show.backdrop_path ?? show.poster_path}
                  title={show.name}
                  type="tv"
                  sliderName="topRated"
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
      {bigMovieMatch && clickedShow && (
        <BigMovieComponent
          sliderName="topRated"
          title={clickedShow.name}
          backdrop_path={clickedShow.backdrop_path ?? clickedShow.poster_path}
          overview={clickedShow.overview}
          movieId={`${bigMovieMatch.params.showId}`}
        />
      )}
    </React.Fragment>
  );
}

export default TopRatedShowSlider;
