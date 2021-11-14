import React, { useState } from "react";
import BuySellButtons from "./BuySellButtons";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function FormBuy({ handleStockNumberChange, data, stockNumber, companyName }) {
  if (data) {
    var totalCost = data.close[data.close.length - 1];
  }
  const handleBuyClick = () => {
    axios
      .get(
        `http://192.168.1.28:8000/buy_stock/?email=${user.email}&symbol=${companyName}&count=${stockNumber}&buying_price=${totalCost}`
      )
      .then(({ data }) => {
        // console.log("REspinse is ", data);
        if (data.flag) {
          setIsBuyingSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const [isBuyingSucceess, setIsBuyingSuccess] = useState(false);
  const { user } = useAuth0();

  console.log(totalCost);
  return (
    <div>
      <br />
      <Box>
        {" "}
        Enter no. of stocks:&nbsp;&nbsp;
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          onChange={handleStockNumberChange}
        />
      </Box>
      <p>
        Total Price: {stockNumber} * {totalCost}= {stockNumber * totalCost}
      </p>
      <Button
        variant="contained"
        style={{ backgroundColor: "#FCA311", marginRight: "4px" }}
        onClick={handleBuyClick}
      >
        Buy
      </Button>{" "}
      {isBuyingSucceess && <div>Stocks bought successfully</div>}
    </div>
  );
}

export default FormBuy;
