import { useQuery } from "@tanstack/react-query";
import { getLatestMovies, IGetMoviesResult } from "../apis";
import { makeImagePath } from "../utils";
import NowPlayingSlider from "../Components/Movies/NowPlayingSlider";
import { useEffect, useState } from "react";
import TopRatedSlider from "../Components/Movies/TopRatedSlider";
import UpcomingComponent from "../Components/Movies/UpcomingSlider";
import {
  Banner,
  Loader,
  Overview,
  Title,
  Wrapper,
} from "../Components/StyledComponents/WrapperStyle";

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
