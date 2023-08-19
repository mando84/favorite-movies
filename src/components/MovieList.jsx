import { useNavigate } from "react-router-dom";

function MovieList(props) {
  const navigate = useNavigate();
  const FavoriteComponent = props.FavoriteComponent;
  return (
    <>
      {props.movies.map((movie, idx) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={idx}
        >
          <img
            src={movie.Poster}
            alt="movie"
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          ></img>
          <div
            onClick={() => props.handleFavoritesClick(movie)}
            className={`${
              props.alreadyFavs === false
                ? "overlay d-flex align-items-center justify-content-center buttonOverlay"
                : "overlay d-flex align-items-center justify-content-center buttonOverlay2"
            }`}
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
}
export default MovieList;
