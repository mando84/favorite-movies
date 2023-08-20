import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MovieSearch from "./pages/MovieSearch";
import Movie from "./pages/Movie";
import { Context } from "./context/Context";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  return (
    <>
      <Context.Provider
        value={{
          searchValue,
          setSearchValue,
          favorites,
          setFavorites,
          movies,
          setMovies,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
