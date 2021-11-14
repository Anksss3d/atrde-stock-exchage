import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Tabmenu({ handleChangeRadio, intervals }) {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="time"
        name="controlled-radio-buttons-group"
        value={intervals}
        onChange={handleChangeRadio}
      >
        <FormControlLabel value="15m" control={<Radio />} label="radar" />
        <FormControlLabel value="1d" control={<Radio />} label="daily" />
        <FormControlLabel value="1wk" control={<Radio />} label="weekly" />
        <FormControlLabel value="1mo" control={<Radio />} label="monthly" />
      </RadioGroup>
    </FormControl>
  );
}
