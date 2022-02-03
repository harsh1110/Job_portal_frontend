import { React, useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
import axios from "axios";

export default function CreateJob() {
  const [designation, setdesignation] = useState("");
  const [position, setposition] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [limit, setlimit] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      designation:designation,
      position:position,
      jobDescription:jobDescription,
      limit:limit
    }
    axios.post("http://localhost:5000/job/create", data)
  .then((res)=>{console.log(res)})
}

  


  return (
    <div className="admin text-center container px-4"  style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        align:"center"
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
            <Typography
              component="h1"
              variant="h5"
              sx={{ alignItems: "center" }}
            >
              Create Job Post
            </Typography>

            {/* <Box component="form" noValidate sx={{ mt: 1, mb: 5 }}> */}
              <TextField
                required
                fullWidth
                id="designation"
                onChange={(e) => setdesignation(e.target.value)}
                label="Designation"
                name="designation"
                color={"secondary"}
                sx={{ mb: 3 }}
              />
              <TextField
                required
                fullWidth
                id="position"
                onChange={(e) => setposition(e.target.value)}
                label="Position"
                name="position"
                color={"secondary"}
                sx={{ mb: 3 }}
              />
              <TextField
                required
                fullWidth
                id="jobdescription"
                onChange={(e) => setjobDescription(e.target.value)}
                label="Job Description"
                name="jobdescription"
                color={"secondary"}
                sx={{ mb: 3 }}
              />
              <TextField
                required
                fullWidth
                id="limit of position"
                onChange={(e) => setlimit(e.target.value)}
                label="Limit Of Position"
                name="limit of position"
                color={"secondary"}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e)=>handleSubmit(e)}
              >
                Submit
              </Button>
            {/* </Box> */}
          </div>
        </Box>
      </Grid>
    </div>
  )
}
