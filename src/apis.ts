const API_KEY = "c90262682dad6eba0118c3e1f266342e";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}

export interface IGetMoviesResult {
  dates: {
    minimum: string;
    maximum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ITvShow {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
}

export interface IGetTvShowResult {
  page: number;
  results: ITvShow[];
  total_pages: number;
  total_results: number;
}

export async function getLatestMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&region=kr`
    )
  ).json();
}

export async function getTopRatedMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko&region=kr`
    )
  ).json();
}

export async function getUpcomingMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko&region=kr`
    )
  ).json();
}

export async function getLatestTvShow() {
  return await (
    await fetch(
      `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko&region=kr`
    )
  ).json();
}

export async function getAirTodayTvShow() {
  return await (
    await fetch(
      `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko&region=kr`
    )
  ).json();
}

export async function getTopRatedTvShow() {
  return await (
    await fetch(
      `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko&region=kr`
    )
  ).json();
}
