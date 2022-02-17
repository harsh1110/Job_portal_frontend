import { React, useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import axios from "axios";
import url from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d82f8",
    },
    secondary: {
      main: "rgb(196,209,64)",
    },
  },
});

export default function CreateJob() {
  const [designation, setdesignation] = useState("");
  const [position, setposition] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [limit, setlimit] = useState("");
  const navigate = useNavigate()

  if(window.document.referrer === "http://localhost:3000/create-job-post"){
    toast.success("Create Job Successfully")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (designation === "" || position === "" || jobDescription === "" || limit === "") {
      toast.error("fields can not be Empty...!!");
    } else {
      const data = {
        designation: designation,
        position: position,
        jobDescription: jobDescription,
        limit: limit,
        userId: localStorage.getItem("user"),
      };

      axios.post(`${url}/job/create`, data,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}}).then((res) => {
        navigate("/create-job-post");
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="background">
        <div
          className="admin row text-center container px-4"
          style={{
            justifyContent: "center",
            background: "url('../../assets/images/background.jpg')",
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
                  type="number"
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
                  type="number"
                  id="limit of position"
                  onChange={(e) => setlimit(e.target.value)}
                  label="Limit Of Position"
                  name="limit of position"
                  color={theme.secondary}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="btn"
                  sx={{ mb: 2 }}
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
  );
}
