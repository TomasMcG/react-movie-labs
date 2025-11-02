import React, {useState, useEffect}  from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import Slider from '@mui/material/Slider';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


import { useQuery } from "@tanstack/react-query";



const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const [genres, setGenres] = useState([{ id: '0', name: "All" }])

const ratings = [
  { id: "0", name: "All" },
  { id: "1", name: "1+" },
  { id: "2", name: "2+" },
  { id: "3", name: "3+" },
  { id: "4", name: "4+" },
  { id: "5", name: "5+" },
  { id: "6", name: "6+" },
  { id: "7", name: "7+" },
  { id: "8", name: "8+" },
  { id: "9", name: "9+" },
  { id: "10", name: "10" },
];

const sortOptions = [
  { id: "none", name: "None" },
  { id: "ratingAscending", name: "Rating: Low - High" },
  { id: "ratingDescending", name: "Rating: High - Low" }
];


    useEffect(() => {
    getGenres().then((allGenres) => {
      setGenres([genres[0], ...allGenres]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


    const handleChange = (e, type, value) => {
    e.preventDefault()
    props.onUserInput(type, value)   // NEW
  }

  const handleTextChange = e => {
    handleChange(e, "name", e.target.value)
  }
  const handleGenreChange = e => {
    handleChange(e, "genre", e.target.value)
  };
   const handleRatingChange = e => {
    handleChange(e, "rating", e.target.value)
  };

     const handleSortChange = e => {
    handleChange(e, "sort", e.target.value)
  };


  return (
    <Card 
      sx={{
        backgroundColor: "#ffda8aff"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1"  sx={{ fontWeight: 'bold' , textDecoration: 'underline'}} >
          <SearchIcon fontSize="large" />
          Filter movies
        </Typography>
            <TextField
      sx={{...formControl}}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
    />
        <InputLabel id="genre-label" sx={{ fontWeight: "bold"}}>Genre</InputLabel>
        <FormControl sx={{...formControl }} >
            <Select
    labelId="genre-label"
    id="genre-select"
    defaultValue=""
    value={props.genreFilter}
    onChange={handleGenreChange}>

            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
  
          
          </Select>
        </FormControl>

      </CardContent>
      <CardContent>

        <InputLabel id="rating-label" sx={{ fontWeight: "bold"}}>Minimum Rating</InputLabel>
        <FormControl sx={{...formControl }} >
            <Select
    labelId="rating-label"
    id="rating-select"
    defaultValue=""
    value={props.ratingFilter}
    onChange={handleRatingChange}
  >


            {ratings.map((rating) => (
              <MenuItem key={rating.id} value={rating.id}>
                {rating.name}
              </MenuItem>
            ))}
          </Select>
   
        </FormControl>
               <Slider
  aria-label="Rating Filter"
  defaultValue={0}
  value={props.ratingFilter}
  onChange={handleRatingChange}
  valueLabelDisplay="auto"
  step={1}
  marks
  min={0}
  max={10}
/>
      </CardContent>
     
      <CardMedia
        sx={{ height: 100 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        
        <InputLabel id="sort-label" sx={{ fontWeight: "bold"}}>Rating Sort</InputLabel>
        <FormControl sx={{...formControl }} >
            <Select
    labelId="sort-label"
    id="sort-select"
    defaultValue=""
    value={props.ratingSort}
    onChange={handleSortChange}
  >


            {sortOptions.map((sort) => (
              <MenuItem key={sort.id} value={sort.id}>
                {sort.name}
              </MenuItem>
            ))}
          </Select>


            <RadioGroup
    aria-labelledby="sort-ratings"
    name="sort-ratings"
    value={props.ratingSort}
    onChange={handleSortChange}
  >
    <FormControlLabel value="none" control={<Radio />} label="None" />
    <FormControlLabel value="ratingAscending" control={<Radio />} label="Ascending" />
    <FormControlLabel value="ratingDescending" control={<Radio />} label="Descending" />
  </RadioGroup>
        </FormControl>
  
        
      </CardContent>
  
    </Card>
  );
}
