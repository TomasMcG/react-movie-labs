import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getPerson } from "../api/tmdb-api";
import { getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const PersonPage = () => {
  const { id } = useParams();

  const { data: person, isPending, isError, error } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const { data: credits } = useQuery({
  queryKey: ["personCredits", { id }],
  queryFn: getPersonMovieCredits,
});

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ marginTop: 5 }}>
        {person.name}
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3, textAlign: "center" }}>
        {person.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            style={{ borderRadius: "10px", marginBottom: "1em" }}
          />
        )}
        <Typography sx={{ marginBottom: 1 }}>
          {person.biography }
         
        </Typography>
        <Typography >
          Born: {person.birthday } 
        </Typography>
        
      </Paper>
    </>
  );
};

export default PersonPage;
