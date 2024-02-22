
import axios from 'axios';

// URL Base: https://api.themoviedb.org/3/
// URL from API: /movie/now_playing?api_key=c00cc792048916cd4398ecccf1ad2b20

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;