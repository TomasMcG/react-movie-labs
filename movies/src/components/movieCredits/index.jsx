import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { excerpt } from "../../util";


export default function MovieCredits({ movie }) {
     const { data, error, isPending, isError } = useQuery({
    queryKey: ['Credits', { id: movie.id }],
    queryFn: getMovieCredits,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

   const cast = data.cast;

  return (
    <TableContainer >
      <Table sx={{ minWidth: 550 }} aria-label="Credits table">
        <TableHead>
          <TableRow variant="h2" sx ={{backgroundColor: "#ffda8aff" , fontWeight: 'bold'}}>
            <TableCell >Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Character</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cast.map((c) => (
            <TableRow key={c.credit_id}>
               <TableCell>
                  {c.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${c.profile_path}`}
                      alt={c.name}
                      style={{ borderRadius: "8px", width: "70px" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </TableCell>
              <TableCell>
        <Link to={`/person/${c.id}`}>{c.name}</Link>
              </TableCell>
              <TableCell>{c.character}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}
