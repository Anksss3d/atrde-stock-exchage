import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "Historical Analysis",
  },
  {
    value: 50,
    label: "Neutral",
  },
  //   {
  //     value: 37,
  //     label: "37°C",
  //   },
  {
    value: 100,
    label: "Social Sentiments",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
        track={false}
      />
    </Box>
  );
}
