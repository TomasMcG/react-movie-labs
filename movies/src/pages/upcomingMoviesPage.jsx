import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import React, { useContext  } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 




const UpcomingMoviesPage = (props) => {
  
const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  })

const {mustWatch } = useContext(MoviesContext)
  
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
      title="Upcoming Movies"
      movies={movies}
     action={(movie) => {
          const isInPlaylist = mustWatch.includes(movie.id);
          if (isInPlaylist)
            {return <CheckCircleIcon color="success" fontSize="large" />;}
          else
            {return <AddToMustWatchIcon movie={movie} color="primary" fontSize="large" />}
        }}
    />
  );
};

export default UpcomingMoviesPage;
