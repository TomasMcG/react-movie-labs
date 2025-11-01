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
      <Table sx={{minWidth: 550}} aria-label="Recommendations table">
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recommendations.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell >{excerpt(r.content)}</TableCell>
              <TableCell >
              <Link
                  to={`/recommendations/${r.id}`}
                  state={{
                      recommendation: r,
                      movie: movie,
                  }}
                >
                  Full Recommendation
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
