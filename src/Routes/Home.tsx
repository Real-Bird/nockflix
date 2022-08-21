import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getLatestMovies, IGetMoviesResult } from "../apis";
import { makeImagePath } from "../utils";
import NowPlayingSlider from "../Components/Movies/NowPlayingSlider";
import { useEffect, useState } from "react";
import TopRatedSlider from "../Components/Movies/TopRatedComponent";
import UpcomingComponent from "../Components/Movies/UpcomingComponent";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.div`
  font-size: 26px;
  width: 80%;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getLatestMovies
  );
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * 19);
    setIndex(randomIdx);
  }, []);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.results[index].backdrop_path || "")}
          >
            <Title>{data?.results[index].title}</Title>
            <Overview>{data?.results[index].overview}</Overview>
          </Banner>
          <NowPlayingSlider />
          <TopRatedSlider />
          <UpcomingComponent />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
