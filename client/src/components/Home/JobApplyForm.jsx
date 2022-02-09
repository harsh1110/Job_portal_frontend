import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { FormControlLabel, FormLabel, FormControl } from "@mui/material";
import { Button, Grid, TextField } from "@mui/material";
import { Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom"
import Card from '@mui/material/Card'
import emailjs from '@emailjs/browser'

export default function JobApplyForm() {
  const { id } = useParams()
  const [ref, setref] = useState("false");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [date, setdate] = useState("");
  const [resume, setresume] = useState();
  const [employment, setemployment] = useState("");
  const [refname, setrefname] = useState("");
  const [refphone, setrefphone] = useState("");
  const [designation, setdesignation] = useState("");
  const callDesignation = () => {
    axios.get(`http://localhost:5000/job/one/${id}`)
      .then((res) => (setdesignation(res.data.designation)))
      .catch((err) => { console.log(err); })
  }

  React.useEffect(() => {
    callDesignation()
  }, []);

  const handleEmployment = (e) => {
    setemployment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData

    data.append("jobId", id)
    data.append("name", name)
    data.append("email", email)
    data.append("phone", phone)
    data.append("date", date)
    data.append("designation", designation)
    data.append("employment", employment)
    data.append("resume", resume)
    data.append("refname", refname)
    data.append("refphone", refphone)

    const emaildata = {
      to_name:name,
      to_email:email,
      designation:designation
    }
    axios.post("http://localhost:5000/job/apply/user", data)
    .then((res) => {
      console.log(res)
      alert("applied successfully")
    })
    .catch((err) => {
      console.log(err);
    })
    emailjs.send('service_8b9bgx1', 'template_6rrbnry', emaildata, 'user_bNQsTrJpBB3n1BSg7wlfG')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
  
  return (
    <div
    className="row job-apply"
    style={{
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "30px" }}>
            <Card className="job-apply-card" style={{ padding: "20px" }}>
              <Grid item sm={12}>
                <Typography
                  component="h1"
                  variant="h4"
                  className="title my-4"
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
                  onChange={(e) => setname(e.target.value)}
                  label="Enter Your Full Name"
                  color={"primary"}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  className="mt-4"
                  required
                  fullWidth
                  onChange={(e) => setemail(e.target.value)}
                  label="Enter Your E-Mail"
                  color={"primary"}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    className="mt-4"
                    required
                    fullWidth
                    onChange={(e) => setphone(e.target.value)}
                    label="Mobile Number"
                    color={"primary"}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="mt-4"
                    id="date"
                    label="Birthday"
                    type="date"
                    onChange={(e) => setdate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  className="mt-4"
                  required
                  fullWidth
                  value={designation}
                  // onChange={(e) => setdesignation(e.target.value)}
                  label="Job Designation"
                  color={"primary"}
                />
              </Grid>
              <Grid item sm={12} style={{ textAlign: "start", marginTop: "2%" }}>
                <FormControl>
                  <FormLabel>What is your current employment status?</FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      value="employed"
                      control={<Radio />}
                      label="Employed"
                      onClick={handleEmployment}
                    />
                    <FormControlLabel
                      value="unemployed"
                      control={<Radio />}
                      label="Un-Employed"
                      onClick={handleEmployment}
                    />
                    <FormControlLabel
                      value="selfemployed"
                      control={<Radio />}
                      label="Self-Employed"
                      onClick={handleEmployment}
                    />
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                      onClick={handleEmployment}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item sm={12} style={{ textAlign: "start" }}>
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
              {ref === "true" ? (
                <Grid container spacing={2} className="mb-2">
                  <Grid item sm={6}>
                    <TextField
                      className="mb-2"
                      required
                      fullWidth
                      onChange={(e) => setrefname(e.target.value)}
                      label="Reference Name"
                      color={"primary"}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      required
                      fullWidth
                      onChange={(e) => setrefphone(e.target.value)}
                      label="Contact Number"
                      color={"primary"}
                    />
                  </Grid>
                </Grid>
              ) : null}

              <Grid item sm={12} style={{ textAlign: "start" }}>
                <FormLabel>Upload your resume.</FormLabel>
              </Grid>
              <Grid item sm={12}>
                <input
                  style={{ float: "left" }}
                  className="mt-2"
                  required
                  fullWidth
                  type="file"
                  onChange={(e) => setresume(e.target.files[0])}
                  label="Resume"
                  color={"primary"}
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                className="btn"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
              {/* </Box> */}

            </Card>
          </div>

        </Box>
      </Grid>

    </div>
  );
}
