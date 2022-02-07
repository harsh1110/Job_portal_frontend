import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Button,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { textAlign } from "@mui/system";
import { useState } from "react";

export default function JobApplyForm() {
  const userId = localStorage.getItem("user");
  const [ref, setref] = useState("false");

  return (
    <div
      className="row  "
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        align: "center",
      }}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Grid item sm={12}>
              <Typography
                component="h1"
                variant="h4"
                className="my-4 purple"
                sx={{ alignItems: "center" }}
              >
                Job Application Form
              </Typography>
            </Grid>

            <Grid item sm={12}>
              <TextField
                className="mt-4"
                required
                fullWidth
                // onChange={(e) => setdesignation(e.target.value)}
                label="Enter Your Full Name"
                color={"primary"}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                className="mt-4"
                required
                fullWidth
                // onChange={(e) => setdesignation(e.target.value)}
                label="Enter Your E-Mail"
                color={"primary"}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  className="mt-4"
                  required
                  fullWidth
                  // onChange={(e) => setdesignation(e.target.value)}
                  label="Mobile Number"
                  color={"primary"}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  className="mt-4"
                  required
                  fullWidth
                  // onChange={(e) => setdesignation(e.target.value)}
                  label="Birth-Date"
                  color={"primary"}
                />
              </Grid>
            </Grid>

            <Grid item sm={12}>
              <FormControl style={{}}>
                <FormLabel>What is your current employment status?</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="employed"
                    control={<Radio />}
                    label="Employed"
                  />
                  <FormControlLabel
                    value="unemployed"
                    control={<Radio />}
                    label="Un-Employed"
                  />
                  <FormControlLabel
                    value="selfemployed"
                    control={<Radio />}
                    label="Self-Employed"
                  />
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <FormLabel>Would you like to add refrence?</FormLabel>

                <RadioGroup onChange={(e) => setref(e.target.value)}>
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {ref === "true" ? <Grid>
              <h1>referance</h1>
            </Grid> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              // onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
            {/* </Box> */}
          </div>
        </Box>
      </Grid>
    </div>
  );
}
