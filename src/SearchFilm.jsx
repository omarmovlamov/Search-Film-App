import { useState } from "react";
import axios from "axios";

function SearchFilm() {
  //useState
  const [film, setFilm] = useState([]);
  const [value, setValue] = useState("");
  //Api Key
  const key = "YourKey";

  //Api
  const getApi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${key}`
      );
      console.log(response.data.results);
      setFilm(response.data.results);
    } catch (error) {
      console.error(error);
    }
    setValue("");
  };

  return (
    <div>
      <form onSubmit={getApi}>
        <div className="col-3">
          <input
            className="effect-1"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search any movie"
          />
          <span className="focus-border"></span>
        </div>
        <button className="button-19">Search</button>
      </form>

      <div className="card">
        {film.map((films) => (
          <div
            key={films.id}
            className="cards animate__animated animate__bounceIn  "
          >
            <div className="text">
              <h1>{films.original_title}</h1>
              {films.overview == "" ? "" : <p> Overview : {films.overview}</p>}
              <p>{`Release Date : ${films.release_date}`}</p>
              <p>Vote Average :{films.vote_average.toFixed(1)}</p>
            </div>

            <img
              src={`https://image.tmdb.org/t/p/w300${films.poster_path}`}
              alt={value}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFilm;
