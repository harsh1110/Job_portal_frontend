import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, FormControlLabel, Typography } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import { Radio, RadioGroup } from "@mui/material";

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

export default function CandidateDetails() {
  const { id } = useParams();
  const [candidate, setcandidate] = useState([]);
  const [application, setapplication] = useState("");
  const [status, setstatus] = useState("");

  React.useEffect((e) => {
    axios.get(`http://localhost:5000/job/apply/one/${id}`).then((value) => {
      console.log(value);
      setcandidate(value.data);
    });
  }, []);

  const handleStatus = (e) => {
    setstatus(e.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      status: status,
    };
    axios
      .post(`http://localhost:5000/job/apply/change-status/${id}`, data)
      .then((value) => {});
  };
  return (
    <div className="admin row container text-center ">
      <Grid xs={12} container spacing={2}>
        <Grid xs={6}>
          <Card sx={{ minHeight: 500, justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h3" component="div" color="primary">
                {candidate.name}
              </Typography>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                {candidate.employStatus}
              </Typography>

              <Typography
                variant="h6"
                className="mt-4"
                sx={{ textAlign: "left" }}
              >
                <EmailIcon color="primary" /> {candidate.email}
              </Typography>
              <Typography
                variant="h6"
                className="mt-1"
                sx={{ textAlign: "left" }}
              >
                <PhoneIcon color="primary" /> {candidate.phone}
              </Typography>
              <Typography
                variant="h6"
                className="mt-1"
                sx={{ textAlign: "left" }}
              >
                <EventIcon color="primary" /> {candidate.date}
              </Typography>

              <Typography
                variant="h6"
                className="mt-4"
                sx={{ textAlign: "left" }}
              >
                Reference:
              </Typography>
              {/* <Typography variant="h6" className="mt-4" sx={{textAlign:"left"}}>{candidate.Reference.refname}</Typography> */}
              {/* <Typography variant="h6" className="mt-4" sx={{textAlign:"left"}}>{candidate.Reference.refphone}</Typography> */}
              <Grid style={{ textAlign: "start" }}>
                <Typography variant="h6" className="mt-3">
                  Application Status:{candidate.ApplicationStatus}
                </Typography>

                <RadioGroup onChange={(e) => setapplication(e.target.value)}>
                  <FormControlLabel
                    className="mt--2"
                    value="approve"
                    control={<Radio />}
                    label="Approve"
                    onClick={handleStatus}
                  />
                  <FormControlLabel
                    value="reject"
                    control={<Radio />}
                    label="Reject"
                    onClick={handleStatus}
                  />
                </RadioGroup>
              </Grid>
            </CardContent>
            {application === "approve" || "reject" ? (
              <CardActions>
                <Button
                  className="btn text-white"
                  onClick={(e) => handleSave(e)}
                >
                  Save
                </Button>
              </CardActions>
            ) : null}
          </Card>
        </Grid>
        <Grid xs={6}>
          <Card sx={{ minHeight: 500, justifyContent: "center" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU"
              style={{ height: "500px", width: "100%" }}
            ></img>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
