import { React, useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button } from "@mui/material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary:{
      main:"#2d82f8"
    },
    secondary:{
      main:"rgb(196,209,64)"
    },
  },
});

export default function CreateJob() {
  const [designation, setdesignation] = useState("");
  const [position, setposition] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [limit, setlimit] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      designation: designation,
      position: position,
      jobDescription: jobDescription,
      limit: limit,
      userId: localStorage.getItem("user"),
    }
    axios.post("http://localhost:5000/job/create", data)
      .then((res) => {
        alert("Job Created Successfully")
        window.location = "/Create%20Job%20Post"
      })
  }




  return (
    <ThemeProvider theme={theme}>
      <div className="background">
      <div className="admin row text-center container px-4" style={{
        justifyContent: "center",
        background:"url('../../assets/images/background.jpg')"
      }}
      >
        <Grid item xs={12} sm={8} md={5}>
          <Box
          className="job-card card p-4"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Typography
                component="h1"
                variant="h4"
                className="title text-center my-4 purple"
                sx={{ alignItems: "center" }}
              >
                Create Job Post
              </Typography>
              <TextField
                className="mt-4"
                required
                fullWidth
                id="designation"
                onChange={(e) => setdesignation(e.target.value)}
                label="Designation"
                name="designation"
                color={theme.secondary}
                sx={{ mb: 3 }}
              />
              <TextField
                required
                fullWidth
                id="position"
                onChange={(e) => setposition(e.target.value)}
                label="Position"
                name="position"
                color={theme.secondary}
                sx={{ mb: 3 }}
              />
              <TextField
                required
                fullWidth
                id="jobdescription"
                onChange={(e) => setjobDescription(e.target.value)}
                label="Job Description"
                name="jobdescription"
                color={theme.secondary}
                sx={{ mb: 3 }}
              />
              <TextField
                required
                fullWidth
                id="limit of position"
                onChange={(e) => setlimit(e.target.value)}
                label="Limit Of Position"
                name="limit of position"
                color={theme.secondary}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="btn"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
              {/* </Box> */}
            </div>
          </Box>
        </Grid>
      </div>
      </div>
    </ThemeProvider>
  )
}
