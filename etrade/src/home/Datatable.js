import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("GPE", 159, 6.0, 24, 4.0),
//   createData("Facebook", 237, 9.0, 37, 4.3),
//   createData("Google", 262, 16.0, 24, 6.0),
// ];
export default function BasicTable({ userStockData }) {
  // const rows = userStockData;
  // console.log("rows are ", rows);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, border: "2px solid" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow style={{ backgroundColor: "#14213D" }}>
            <TableCell style={{ color: "white" }}>Company Name</TableCell>
            <TableCell style={{ color: "white" }}>Company Symbol</TableCell>
            <TableCell style={{ color: "white" }}>Stock Count </TableCell>
            <TableCell style={{ color: "white" }}>Total Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userStockData &&
            userStockData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.company_name}</TableCell>
                <TableCell>{row.company_symbol}</TableCell>
                <TableCell>{row.stocks_count}</TableCell>
                <TableCell>
                  {Math.round((row.total_value + Number.EPSILON) * 100) / 100}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
