import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<Home />} />
        <Route path="tv" element={<Tv />} />
        <Route path="tv/:showId" element={<Tv />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:searchId" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
