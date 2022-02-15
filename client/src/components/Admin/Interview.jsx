import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import url from "../../config";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser"
import { init } from '@emailjs/browser';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import {
  TextField,
  Typography,
  Box,
  Grid,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";

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

const Interview = () => {
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [data, setdata] = useState([]);
  const [interview, setinterview] = useState([]);
  const [link, setlink] = useState("");

  const { id } = useParams();

  init("user_g9I6tQwx976Da3rQ705Fn");
  React.useEffect((e) => {
    axios.get(`${url}/job/apply/one/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((value) => {
        setdata(value.data);
      });
    axios.get(`${url}/interview/one/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((value) => {
        setinterview(value.data);
      });
  }, []);

  const handleSubmit = () => {
    const details = {
      userId: id,
      date: date,
      email: data.email,
      designation: data.designation,
      time: time,
      link: link,
    };
    const emaildata = {
      to_name: data.name,
      date: date,
      time: time,
      link: link,
      to_email: data.email,
    }

    axios.post(`${url}/interview/create`, details, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        emailjs.send("service_interview", "template_xf2i9ok", emaildata)
          .then((result) => {
            console.log(result.text);
            window.location = `/jobdetails/${data.jobId}`
          })
          .catch((error) => {
            console.log(error.text);
          });
      });
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
              {interview.length === 0 ?

                <div>
                  <Typography
                    component="h1"
                    variant="h4"
                    className="title text-center my-3 purple"
                    sx={{ alignItems: "center" }}
                  >
                    Schedule Interview
                  </Typography>

                  <Form.Control
                    className="mb-3"
                    fullWidth
                    size="lg"
                    id="designation"
                    value={data.designation}
                  />

                  <Form.Control
                    className="mb-3"
                    fullWidth
                    size="lg"
                    id="email"
                    value={data.email}
                  />

                  <TextField
                    required
                    fullWidth
                    id="date"
                    label="Date"
                    type="date"
                    onChange={(e) => setdate(e.target.value)}
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    required
                    fullWidth
                    id="time"
                    label="Time"
                    type="time"
                    onChange={(e) => settime(e.target.value)}
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    required
                    fullWidth
                    id="link"
                    label="Interview Link"
                    // type="date"
                    onChange={(e) => setlink(e.target.value)}
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                :
                <div style={{height:"490px"}}>
                  <Typography
                    component="h1"
                    variant="h4"
                    className="title text-center my-4 purple"
                    sx={{ alignItems: "center" }}
                  >
                    Interview Details
                  </Typography>

                  <Typography
                    variant="h6"
                    className="my-4"
                    sx={{ textAlign: "left" }}
                  >
                    <LaptopMacIcon color="primary" />&nbsp;&nbsp;&nbsp; {interview.designation}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    <EmailIcon color="primary" />&nbsp;&nbsp;&nbsp; {interview.email}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    <EventIcon color="primary" /> &nbsp;&nbsp;&nbsp;{interview.Date}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    <AccessTimeIcon color="primary" /> &nbsp;&nbsp;&nbsp;{interview.Time}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    <LinkIcon color="primary" /> &nbsp;&nbsp;&nbsp;<a className="text-decoration-none" href={interview.link} target="_blank">Join Meeting</a>
                  </Typography>

                </div>
              }
            </Box>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Interview;
