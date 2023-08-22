import { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "../components/MovieList";
import MovieListHeading from "../components/MovieListHeading";
import SearchBox from "../components/SearchBox";
import AddFavorites from "../components/AddFavorites";
import RemoveFavorites from "../components/RemoveFavorites";
import { useContext } from "react";
import { Context } from "../context/Context";

function MovieSearch() {
  const {
    favorites,
    setFavorites,
    searchValue,
    setSearchValue,
    movies,
    setMovies,
  } = useContext(Context);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=6cc70043`;

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      let onlyPosters = responseJSON.Search.filter((elem) => {
        if (elem.Poster !== "N/A") return true;
        else return false;
      });
      setMovies(onlyPosters);
    } else if (searchValue === "") {
      setMovies([]);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem("favorite movies"));
    if (movieFavorites === null) {
      setFavorites([]);
    } else {
      setFavorites(movieFavorites);
    }
  }, []);

  const searchObjectArr = (objLocal, obj) => {
    let result = false;
    objLocal.map((item) => {
      if (item.imdbID === obj.imdbID) {
        result = true;
      }
    });
    return result;
  };

  const addFavoriteMovie = (movie) => {
    let constFavs = JSON.parse(localStorage.getItem("favorite movies"));

    if (constFavs === null) {
      constFavs = [];
    }

    if (searchObjectArr(constFavs, movie) === false) {
      const newFavoriteList = [...favorites, movie];
      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    localStorage.setItem("favorite movies", JSON.stringify(newFavoriteList));
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("favorite movies", JSON.stringify(items));
  };
  if (favorites.length === 0) {
    return (
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading={"Movies"} />
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            alreadyFavs={false}
            handleFavoritesClick={addFavoriteMovie}
            FavoriteComponent={AddFavorites}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading={"Movies"} />
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            alreadyFavs={false}
            handleFavoritesClick={addFavoriteMovie}
            FavoriteComponent={AddFavorites}
          />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading={"Favorites"} />
        </div>
        <div className="row">
          <MovieList
            movies={favorites}
            alreadyFavs={true}
            handleFavoritesClick={removeFavoriteMovie}
            FavoriteComponent={RemoveFavorites}
          />
        </div>
      </div>
    );
  }
}
export default MovieSearch;
