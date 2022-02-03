import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import MediaCard from "./Home/Cards";
import CrouselCompo from "./Home/CrouselCompo";

const HomePage = () => {
  return (
    <>
      <div
      className="admin row  container "
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          align: "center",
        }}
      >
        <Grid item xs={12} sm={8} md={5}>
          <Typography
            component="h1"
            variant="h3"
            className="my-3 purple"
            // style={{ alignItems: "center" }}
          >
            Welcome!
          </Typography>
        
        </Grid>
      </div>
      {/* <CrouselCompo/> */}
      {/* <div className="text-center my-4">
      <h3 className="text-primary my-4">
        Suggested Products
      </h3>
      <div className='container d-flex'>
        <div className="col-3">
        <MediaCard/>
        </div>
        <div className="col-3">
        <MediaCard/>
        </div>
        <div className="col-3">
        <MediaCard/>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default HomePage;
