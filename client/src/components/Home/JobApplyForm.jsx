import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { FormControlLabel, FormLabel, FormControl } from "@mui/material";
import { Button, Grid, TextField } from "@mui/material";
import { Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import emailjs from "@emailjs/browser";
import url from "../../config";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from "react-toastify";

export default function JobApplyForm() {
  const { id } = useParams();
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
  const [limit, setlimit] = useState("");

  const callDesignation = () => {
    axios.get(`${url}/job/one/${id}`)
      .then((res) => {
        setdesignation(res.data.designation)
        setlimit(res.data.limit);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    callDesignation()
  }, []);

  const handleEmployment = (e) => {
    setemployment(e.target.value);
  };

  // var fileInput = document.getElementById('resume').value
  // console.log(fileInput)
  // var filePath = fileInput.value;
  var allowedExtensions = /(\.pdf)$/i;

  const handleSubmit = (e, fileInput) => {
    console.log(fileInput)
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      date === "" ||
      employment === "" ||
      resume === ""
    ) {
      toast.error("fields can not be Empty...!!");
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)) {
      toast.error("email is not valid...!!");
    } else if (!/[0-9]{10}/.test(phone)) {
      toast.error(" mobile number is invalid");
    } else if (!allowedExtensions.exec(fileInput)) {
      toast.error("Resume format is not correct...!!!")
    }
    else {
      const data = new FormData();

      data.append("jobId", id);
      data.append("name", name);
      data.append("email", email);
      data.append("phone", phone);
      data.append("date", date);
      data.append("designation", designation);
      data.append("employment", employment);
      data.append("resume", resume);
      data.append("refname", refname);
      data.append("refphone", refphone);

      axios.post(`${url}/job/apply/user`, data)
        .then((res) => {
          console.log(res);
          alert("applied successfully");
         window.location = `/thankyou`;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {
            limit === 0 ?
              <Grid
                item
                xs={12}
                sx={{
                  marginBlock: "195px",
                  height: 490,
                  textAlign: "center",
                }}
              >
                <HighlightOffIcon
                  className="my-5"
                  sx={{ height: "20%", width: "20%", color: "red" }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontSize: 60, fontWeight: "bold", color: "#1565c0" }}
                >
                  Oppps...!
                </Typography>
                <Typography variant="h6">
                  This Form is Expiered!!
                </Typography>
              </Grid>
              :
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
                  <Grid
                    item
                    sm={12}
                    style={{ textAlign: "start", marginTop: "2%" }}
                  >
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
                      id='resume'
                      required
                      fullWidth
                      type="file"
                      onChange={(e) => setresume(e.target.files[0])}
                      label="Resume"
                      color={"primary"}
                      accept="image/jpeg,image/png,image/x-eps,application/pdf"
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    className="btn"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => handleSubmit(e, document.getElementById('resume').value)}
                  >
                    Submit
                  </Button>
                  {/* </Box> */}
                </Card>
              </div>
          }
        </Box>
      </Grid>
    </div>
  );
}
