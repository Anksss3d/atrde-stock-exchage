import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Charts from "./Charts";
import Tabmenu from "./Tabmenu";
import Container from "@mui/material/Container";
import axios from "axios";
import { Divider } from "@mui/material";
import Slider from "./Slider";
import BuySellButtons from "./BuySellButtons";
import FormBuy from "./FormBuy";
import ViewPrediction from "./ViewPrediction";
function Explore() {
  const fetchData = () => {
    axios
      .get(
        `http://192.168.1.28:8000/get_stock_history/${companyName}/${intervals}/`
      )
      .then(({ data }) => {
        setData(data);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const [data, setData] = useState("");

  const [companyName, setCompanyName] = useState("FB");
  const handleChangeCompany = (event) => {
    setCompanyName(event.target.value);
  };

  const [intervals, setIntervals] = React.useState("15m");
  const handleChangeRadio = (event) => {
    setIntervals(event.target.value);
  };

  const handleStockNumberChange = (e) => {
    setStockNumber(e.target.value);
  };
  const [stockNumber, setStockNumber] = useState(0);

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [intervals, companyName]);

  console.log(data);
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
      <h2>Explore</h2>
      <center>
        <Dropdown handleChangeCompany={handleChangeCompany} />
      </center>
      <br />
      <Divider />
      <Tabmenu handleChangeRadio={handleChangeRadio} intervals={intervals} />
      <br />
      {!isLoading && (
        <center>
          <div
            style={{
              borderStyle: "solid",
              maxWidth: "80%",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <Charts data={data} />
          </div>
        </center>
      )}
      <br />
      <br />
      <div
        style={{
          borderStyle: "solid",
          maxWidth: "80%",
          margin: "auto",
          padding: "20px",
        }}
      >
        <center>
          <div>
            <center>
              <h3>Predict Stocks</h3> <Slider />
            </center>
          </div>
          <ViewPrediction />
          <div>
            <FormBuy
              handleStockNumberChange={handleStockNumberChange}
              stockNumber={stockNumber}
              data={data}
              companyName={companyName}
            />
          </div>
        </center>
      </div>
    </Container>
  );
}

export default Explore;
