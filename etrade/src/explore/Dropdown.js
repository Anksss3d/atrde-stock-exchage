import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NativeSelect, StylesProvider } from "@material-ui/core";
export default function Dropdown({ handleChangeCompany }) {
  return (
    <Box sx={{ width: 120, backgroundColor: "#FCA311" }}>
      <FormControl className={StylesProvider.formControl}>
        <NativeSelect defaultValue="FB" onChange={handleChangeCompany}>
          <option value="FB">Facebook</option>
          <option value="GOOGL">Google</option>
          <option value="TSLA">Tesla</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
