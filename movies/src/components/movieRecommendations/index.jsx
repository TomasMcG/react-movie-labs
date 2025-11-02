import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { excerpt } from "../../util";

export default function MovieRecommendations({ movie }) {
     const { data, error, isPending, isError } = useQuery({
    queryKey: ['Recommendations', { id: movie.id }],
    queryFn: getMovieRecommendations,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

   const recommendations = data.results;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="Recommendations table">
        <TableHead>
          <TableRow sx={{backgroundColor: "#ffda8aff"}}>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>More Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recommendations.map((r) => (
            <TableRow key={r.id}>
              <TableCell>
                <img
                  src={`https://image.tmdb.org/t/p/w200${r.poster_path}`}
                  alt={r.title}
                  style={{ borderRadius: "8px", width: "80px" }}
                />
              </TableCell>
              <TableCell>{r.title}</TableCell>
              <TableCell>{r.vote_average}</TableCell>
              <TableCell>
                <Link to={`/movies/${r.id}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
