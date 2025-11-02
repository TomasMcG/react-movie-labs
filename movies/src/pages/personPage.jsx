import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getPerson } from "../api/tmdb-api";
import { getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";

const PersonPage = (props) => {
  const { id } = useParams();

  const { data: person, isPending, isError, error } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const { data: credits } = useQuery({
  queryKey: ["personCredits", { id }],
  queryFn: getPersonMovieCredits,
});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };


  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const cast = credits?.cast || [];
  const paginatedCast = cast.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Typography variant="h2"  sx={{ marginTop: 5 }}>
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

    <Typography variant="h3" sx={{ marginBottom: 2 , backgroundColor: "#ffda8aff"}}>
        Filmography
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 550 }} aria-label="filmography table">
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Character</TableCell>
              <TableCell>More Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCast?.map((movie) => (
              <TableRow key={movie.credit_id}>
                <TableCell>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={{ borderRadius: "8px", width: "70px" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.character}</TableCell>
                <TableCell>
                  <Link to={`/movies/${movie.id}`}>Movie Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       <Box sx={{ display: "flex", justifyContent: "flex-start", ml: 2 }}>
        <TablePagination
          component="div"
          count={cast.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
        </Box>
      </TableContainer>
   

 

    </>
  );
};

export default PersonPage;
