import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Radio } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";

const theme = createTheme();

export default function ApplyJob() {
  // const id = localStorage.getItem("user")
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [date, setdate] = useState("");
  const [designation, setdesignation] = useState("");
  const [employment, setemployment] = useState("");
  const [ref, setref] = React.useState("false");
  const [reference, setreference] = useState("");
  const [jobid, setjobid] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      jobId: jobid,
      name: name,
      email: email,
      phone: number,
      date: date,
      employstatus: employment,
      reference: reference,
      userId: user,
    };
    axios.post(`http://localhost:5000/job/apply/user`, data)
      .then((res) => {
        alert("Job Applied Successfully")
        window.location = "/Applied%20Job"
      })
      .catch((err) => {
        console.log(err);
      })
  };
  React.useEffect(() => {
    axios.get(`http://localhost:5000/job/one/${id}`).then((res) => {
      // console.log(res.data);
      setdesignation(res.data.designation);
      setjobid(res.data._id);
    });
    // console.log(jobid);

    axios.get(`http://localhost:5000/user/${user}`).then((res) => {
      // console.log(res.data);
      setname(res.data.name);
      setemail(res.data.email);
      setnumber(res.data.phone);
    });
  }, []);
  const handleemployment = (e) => {
    setemployment(e.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" className="purple">
            Job Application Form
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  autoFocus
                  value={name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                />
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "1px", paddingLeft: "15px" }}
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="mobile number"
                    label="Mobile Number"
                    id="mobilenumber"
                    autoComplete="mobile number"
                    value={number}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  fullWidth
                    id="date"
                    label="Birthday"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setdate(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="jobpost"
                  label="What Position Are You Applying For?"
                  id="jobpost"
                  autoComplete="jobpost"
                  value={designation}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    What is your current employment status?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    multiple
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="employed"
                      control={<Radio />}
                      label="Employed"
                      onClick={handleemployment}
                    />
                    <FormControlLabel
                      value="selfemployed"
                      control={<Radio />}
                      label="Self-Employed"
                      onClick={handleemployment}
                    />
                    <FormControlLabel
                      value="unemployed"
                      control={<Radio />}
                      label="Un-Employed"
                      onClick={handleemployment}
                    />
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                      onClick={handleemployment}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Would You Like To Add Reference?</FormLabel>
                  <RadioGroup onChange={(e) => setref(e.target.value)}>
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    // onClick={handleOpen}
                    />

                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {ref === "true" ? (
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => setreference(e.target.value)}
                      required
                      fullWidth
                      name="jobpost"
                      label="Add Reerence"
                      id="jobpost"
                      autoComplete="jobpost"
                    />
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Submit Your Resume</FormLabel>
                  <Grid item xs={12}>
                    <input type="file"></input>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              className="btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
