
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import CreditsIcon from "@mui/icons-material/Navigation";
import RecommendIcon from "@mui/icons-material/ThumbUp";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import MovieRecommendations from "../movieRecommendations";
import MovieCredits from "../movieCredits";




const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);
const [recsOpen, setRecsOpen] = useState(false);
const [creditsOpen, setCreditsOpen] = useState(false);



  return (
    
    <>
      <Typography variant="h5" component="h3" sx={{fontWeight: 'bold'}}>
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
          
        ))
        
        }
        
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip
          label={`Original Language: ${movie.original_language})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

 
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))} 
      </Paper>


      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '10em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>


       <Fab
        color="primary"
        variant="extended"
        onClick={() => setRecsOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "20em",
        }}
      >
        <RecommendIcon />
        Recommendations
      </Fab>
      <Drawer
        anchor="bottom"
        open={recsOpen}
        onClose={() => setRecsOpen(false)}
      >
        <MovieRecommendations movie={movie} />
      </Drawer>

       <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setCreditsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '40em',
          backgroundColor: "#0b5e19ff"
        }}
      >
        <CreditsIcon />
        Credits
      </Fab>
      <Drawer anchor="top" open={creditsOpen} onClose={() => setCreditsOpen(false)}>
        <MovieCredits movie={movie} />
      </Drawer>



      </>
  );
};
export default MovieDetails ;
