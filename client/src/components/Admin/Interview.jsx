import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "../../config";
import DatePicker from "@mui/lab/DatePicker";
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
  const [data, setdata] = useState("");
  const [link, setlink] = useState("");

  const { id } = useParams();

  React.useEffect((e) => {
    axios.get(`${url}/job/apply/one/${id}`).then((value) => {
      console.log(value.data);
      setdata(value.data);
    });
  }, []);

  const handleSubmit = () => {
      const data={  
        userId:id,
        Date:date,
        Time:time,
        link:link
      }

    axios.post(`${url}/interview/create`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}},data).then((res)=>
    console.log(res))
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
                  className="title text-center my-3 purple"
                  sx={{ alignItems: "center" }}
                >
                  Schedule Interview
                </Typography>

                <TextField
                  className="mt-4"
                  required
                  fullWidth
                  value={data.designation}
                  id="name"
                  // onChange={(e) => setname(e.target.value)}
                  label="Full Name"
                  name="name"
                  color={theme.secondary}
                  sx={{ mb: 3 }}
                />

                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={data.email}
                  label="Email address"
                  color={theme.secondary}
                  sx={{ mb: 3 }}
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
            </Box>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Interview;
