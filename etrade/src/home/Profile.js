import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth0 } from "@auth0/auth0-react";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };

// }

function createData(keya, valuea) {
  return { keya, valuea };
}

export default function Profile() {
  const { user } = useAuth0();
  const rows = [
    createData("Name", user.name),
    createData("Email", user.email),
    // createData("Porfolio Balance", 343),
    // createData("Total Stockcount", 344),
    //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 300, border: "2px solid" }}
        size="small"
        aria-label="a dense table"
      >
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.keya}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.keya}
              </TableCell>
              <TableCell align="right">{row.valuea}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
