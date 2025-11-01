import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getNowPlayingMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'



const NowPlayingPage = (props) => {
  
const { data, error, isPending, isError  } = useQuery({
    queryKey: ['now_playing'],
    queryFn: getNowPlayingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;


 const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Now Playing"
      movies={movies}
     action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default NowPlayingPage;
