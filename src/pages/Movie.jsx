import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Movie() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});

  const getMovie = async () => {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=6cc70043`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    setMovieData(responseJSON);
  };

  useEffect(() => {
    getMovie();
  });

  if (document.readyState === "complete") {
    return (
      <div className="moviePage">
        <img src={`${movieData.Poster}`} alt="Movie"></img>
        <h1 style={{ color: "#fc4c28" }}>
          Title: <span style={{ color: "white" }}>{movieData.Title}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Actors: <span style={{ color: "white" }}>{movieData.Actors}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Year: <span style={{ color: "white" }}>{movieData.Year}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Director: <span style={{ color: "white" }}>{movieData.Director}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Rated: <span style={{ color: "white" }}>{movieData.Rated}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Genre: <span style={{ color: "white" }}>{movieData.Genre}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Runtime: <span style={{ color: "white" }}>{movieData.Runtime}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          Plot: <span style={{ color: "white" }}>{movieData.Plot}</span>
        </h1>

        <h1 style={{ color: "#fc4c28" }}>
          Awards: <span style={{ color: "white" }}>{movieData.Awards}</span>
        </h1>
        <h1 style={{ color: "#fc4c28" }}>
          BoxOffice:
          <span style={{ color: "white" }}>{movieData.BoxOffice}</span>
        </h1>
      </div>
    );
  }
}
export default Movie;
