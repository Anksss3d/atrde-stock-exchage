import { Button, Paper } from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Unauthpage() {
  var background = { backgroundSize: "cover" };
  const { loginWithRedirect } = useAuth0();

  var textStyle = {
    position: "absolute",
    top: "40%",
    left: "45%",
    color: "white",
  };
  return (
    <div style={{ width: "auto" }}>
      <Paper>
        <img
          style={background}
          width="100%"
          height="700px"
          src="https://images.pexels.com/photos/241544/pexels-photo-241544.jpeg?cs=srgb&dl=pexels-lorenzo-241544.jpg&fm=jpg"
        />
      </Paper>
      <div style={textStyle}>
        <h1 style={{ color: "white" }}>A-Trading</h1>
        <center>
          <Button
            size="small"
            variant="contained"
            onClick={() => loginWithRedirect()}
            style={{ backgroundColor: "#FCA311", color: "#FFFFFF" }}
          >
            Login
          </Button>
        </center>
      </div>
    </div>
  );
}

export default Unauthpage;
