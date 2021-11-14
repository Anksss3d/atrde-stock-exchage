import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewPrediction() {
  const [open, setOpen] = React.useState(false);
  const [shouldUserBuy, setshouldUserBuy] = useState("Computing...");
  const handleOpen = () => {
    axios
      .get(`http://192.168.1.28:8000/find_prediction/googl/`)
      .then((res) => {
        if (res.data.prediction == "Buy") {
          setshouldUserBuy(true);
        } else setshouldUserBuy(false);
        setOpen(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button
        variant="contained"
        style={{ backgroundColor: "#FCA311", marginRight: "4px" }}
        // onClick={handleBuyClick}
        onClick={handleOpen}
      >
        View Prediction
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Prediction
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {shouldUserBuy ? (
              <p>Our experts suggests you to buy the stocks!! </p>
            ) : (
              <p>Our experts suggest you to wait.</p>
            )}
            {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
