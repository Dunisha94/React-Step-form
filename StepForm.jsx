import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Can_Sidenav from "../../components/Sidenav/Can_Sidenav";
import Can_Navbar from "../../components/Navbar/Can_Navbar";
import Checkout from "../Form/Checkout";

export default function Form() {
  return (
    <>
      <Can_Navbar />
      {/* <div className="bgcolor"> */}
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Can_Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={8}>
            <Checkout />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
