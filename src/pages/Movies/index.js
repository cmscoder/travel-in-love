import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './movie-info.css';
import api from '../../services/api';
import {toast} from 'react-toastify'



function Movies() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadMovie(){
    await api.get(`/movie/${id}`, {
      params:{
        api_key: "c00cc792048916cd4398ecccf1ad2b20",
        language:"en-UK",
      }
    }).then((response) => {
      setMovie(response.data);
      setLoading(false);
    }).catch(() => {
      navigate("/", {replace: true})
      return;
    })

  }


  loadMovie();

  return () => {
    console.log("COMPONENTE FOI DESMONTADO")
  }

  }, [navigate, id])


  function saveMovie(){
    const myMoviesList = localStorage.getItem("@favoritemoviesflix");

    let savedMovies = JSON.parse(myMoviesList) || [];

    const hasMovie = savedMovies.some((movies) => movies.id === movie.id)

    if(hasMovie) {

      toast.warn("This movie is already in your list")
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@favoritemoviesflix", JSON.stringify(savedMovies));
    toast.success("MOVIE SAVED WITH SUCCESS!")

  }

  if(loading) {
    return(
      <div className='movie-info'>
        <h1>Loading the details...</h1>
      </div>
    )
  }


  return (
    <div className='movie-info'>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>

      <strong>Vote: {movie.vote_average} /10 </strong>

      <div className='area-buttons'>
        <button onClick={saveMovie}>Save</button>
        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movies;