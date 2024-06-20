import { useEffect, useState } from 'react';
import './favorites.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'

function Favorites () {

  const [movies, setMovies] =  useState([])

  useEffect(() => {
    const myList = localStorage.getItem("@favoritemoviesflix");

    setMovies(JSON.parse(myList)  || [])
  }, [])


  function deleteMovie(id){
    let moviesFiltered = movies.filter((item) =>  {
      return (item.id !== id)
    })
    setMovies(moviesFiltered);
    localStorage.setItem("@favoritemoviesflix", JSON.stringify(moviesFiltered));
    toast.success("Movie removed with success")
  }

  return (
    <div className="my-movies">
      <h1>My favorite Movies</h1>

      {movies.length === 0 && <span>You don't have any saved movie :( </span>}

      <ul>{movies.map((movie) => {
        return(
          <li key={movie.id}>
            <span>{movie.title}</span>
            <div>
              <Link to={`/movie/${movie.id}`}>See the details</Link>
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            </div>
          </li>
        )
      })} </ul>
    </div>
  )
}

export default Favorites;