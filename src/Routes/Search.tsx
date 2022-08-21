import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const searchKeyword = new URLSearchParams(location.search).get("keyword");
  console.log(searchKeyword);
  return null;
}

export default Search;
