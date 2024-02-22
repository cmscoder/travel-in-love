import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './movie-info.css';
import api from '../../services/api';



function Movies() {
  const {id} = useParams();
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
      console.log("MOVIE NOT FOUND!")
    })

  }


  loadMovie();

  return () => {
    console.log("COMPONENTE FOI DESMONTADO")
  }

  }, [])


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
    <button>Save</button>
    <button>
      <a href="#">
        Trailer
      </a>
    </button>
      </div>
    </div>
  )
}

export default Movies;