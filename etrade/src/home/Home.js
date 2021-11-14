import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Datatable from "./Datatable";
import Profile from "./Profile";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const fetchUserData = () => {
    axios
      .get(`http://192.168.1.28:8000/get_user_data/?email=${user.email}`)
      .then(({ data }) => {
        console.log("User data reie", data);
        setuserStockData(data);
      })
      .catch((err) => console.log(err));
  };
  const { user } = useAuth0();
  const [userStockData, setuserStockData] = useState("");
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Container
      sx={{
        mx: "auto",
        bgcolor: "white",
        width: "100%",
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: "center",
      }}
    >
      {/* <h2>Home</h2> */}
      <div>
        <h3>Profile</h3>
        <center>
          <div style={{ maxWidth: "500px" }}>
            <Profile />
          </div>
        </center>
      </div>

      <br />
      <br />
      <Datatable userStockData={userStockData} />
      <br />
    </Container>
  );
}

export default Home;
