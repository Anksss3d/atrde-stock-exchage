import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Home from "./home/Home";
import Explore from "./explore/Explore";
import { Divider } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // bgcolor: "#E5E5E5",
        bgcolor: "white",
        display: "flex",
        height: "100vh",
      }}
    >
      <Tabs
        // inkBarStyle={{ background: "pink" }}
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        textColor="white"
        indicatorColor="secondary"
        aria-label="Vertical tabs example"
        sx={{ borderRight: 2, borderColor: "divider" }}
        style={{
          minWidth: "10%",
          height: "1200px",
          backgroundColor: "#979393",
        }}
      >
        <Tab label="HOME" {...a11yProps(0)} />
        <Tab label="EXPLORE" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ minWidth: "80%" }}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ minWidth: "80%" }}>
        <Explore />
      </TabPanel>
    </Box>
  );
}
