import React from "react";
import Card from "@mui/material/Card";
import { Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function ThankYou() {
  return (
    <div className="background-thankyou">
      <Grid
        container
      >
        <Grid
          item
          xs={12}
          sx={{
            marginTop:"180px",
            height: 490,
            textAlign: "center",
          }}
        >
          <CheckCircleOutlineIcon
            className="my-5"
            sx={{ height: "20%", width: "20%", color: "green" }}
          />
          <Typography
            variant="h6"
            sx={{ fontSize: 60, fontWeight: "bold", color: "#1565c0" }}
          >
            Thank You!
          </Typography>
          <Typography variant="body1">
            Your information has been recorded!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
