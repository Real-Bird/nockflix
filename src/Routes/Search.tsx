import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearchMovies, ISearchMoviesResult } from "../apis";
import SearchMoviesSlider from "../Components/Search/SearchMoviesSlider";
import SearchTvShowSlider from "../Components/Search/SearchTvShowSlider";
import {
  Banner,
  Loader,
  Overview,
  Title,
  Wrapper,
} from "../Components/StyledComponents/WrapperStyle";
import { makeImagePath } from "../utils";

function Search() {
  const location = useLocation();
  const searchKeyword = new URLSearchParams(location.search).get("keyword");
  const { isLoading, data } = useQuery<ISearchMoviesResult>(
    ["search", "searchMovies"],
    () => getSearchMovies(`${searchKeyword}`)
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SearchMoviesSlider />
          <SearchTvShowSlider query={`${searchKeyword}`} />
        </>
      )}
    </Wrapper>
  );
}

export default Search;
