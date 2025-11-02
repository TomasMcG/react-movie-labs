import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from '@mui/material/Pagination'; // MUI pagination


const HomePage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  })

  const [page, setPage] = useState(1);
   const moviesPerPage = 10;
   

  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;


  const startIndex = (page - 1) * moviesPerPage;
  const paginatedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

    const handlePageChange = (event, value) => {
    setPage(value);
  }



  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

    return (
 
      <><PageTemplate
        title="Discover Movies"
        movies={paginatedMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />} /><Pagination
          count={Math.ceil(movies.length / moviesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ display: 'flex', justifyContent: 'center' }} /></>
    
  );

};
export default HomePage;
