import React from "react";
import Card from "@mui/material/Card";
import { Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function ThankYou() {
  return (
    <div>
      <Grid
        container
        sx={{
          background:
            "url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm222batch5-kul-03.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=08fbfb223887d33030e97becaf4e20dc)",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: 600,
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
