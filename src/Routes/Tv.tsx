import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getLatestTvShow, IGetTvShowResult, ITvShow } from "../apis";
import {
  Banner,
  Loader,
  Overview,
  Title,
  Wrapper,
} from "../Components/StyledComponents/WrapperStyle";
import AirTodaySlider from "../Components/TvShow/AirTodaySlider";
import OnTheAirSlider from "../Components/TvShow/OnTheAirSlider";
import TopRatedShowSlider from "../Components/TvShow/TopRatedShowSlider";
import { makeImagePath } from "../utils";

function Tv() {
  const { isLoading, data } = useQuery<IGetTvShowResult>(
    ["tvShow", "onTheAir"],
    getLatestTvShow
  );
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (data) {
      const len = data.results.filter(
        (show) => show.overview !== "" && show.backdrop_path !== null
      ).length;
      const randomIdx = Math.floor(Math.random() * len);
      setIndex(randomIdx);
    }
  }, [data]);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              data?.results.filter(
                (show) => show.overview !== "" && show.backdrop_path !== null
              )[index].backdrop_path || ""
            )}
          >
            <Title>
              {
                data?.results.filter(
                  (show) => show.overview !== "" && show.backdrop_path !== null
                )[index].name
              }
            </Title>
            <Overview>
              {
                data?.results.filter(
                  (show) => show.overview !== "" && show.backdrop_path !== null
                )[index].overview
              }
            </Overview>
          </Banner>
          <OnTheAirSlider />
          <AirTodaySlider />
          <TopRatedShowSlider />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
