import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Form } from "react-bootstrap";
import { deepPurple, purple } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Resizer from "react-image-file-resizer";
import {
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import url from "../../config";
import Link from "@mui/material/Link";

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
export default function Registration() {
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pic, setpic] = useState();
  const [pass, setpass] = useState("");
  const [conpass, setconpass] = useState("");
  const [data, setdata] = useState();
  const [key, setKey] = useState("");
  // var value = {}
  useEffect(() => {
    axios.get("http://localhost:5000/all").then((value) => {
      setdata(value.data);
    });
  }, []);

  var sendData = () => {
    const dat = new FormData();

    dat.append("name", name);
    dat.append("email", email);
    dat.append("phone", phone);
    dat.append("pass", pass);
    dat.append("pic", pic);
    dat.append("pic", role);
    console.log(dat);
    axios
      .post(`${url}/add-user`, dat)
      .then((res) => {
        alert("Data send successfully...!!");
        window.location = "/login";
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var emaildata = [];
    if (data.length === 0) {
      emaildata = [];
    } else {
      data.map((item) => emaildata.push(item.email));
    }

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      pic === "" ||
      pass === "" ||
      conpass === "" ||
      role === ""
    ) {
      alert("fields can not Empty...!!");
    }
    // else if (!(/[a-zA-Z]{5}/).test(name)) {
    //     alert("Name is not valid...!!")
    // }
    else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)) {
      alert("email is not valid...!!");
    } else if (emaildata.includes(email)) {
      alert("email is already exist..!!");
    } else if (!/[0-9]{10}/.test(phone)) {
      alert(" mobile number is invalid");
    } else if (!/[a-zA-Z0-9]{8}/.test(pass)) {
      alert("Password must be more then or equal to 8 character");
    } else if (pass !== conpass) {
      alert("password Does't Match try again..");
    } else if (key !== "harsh123") {
      alert("Enter Valid Secrate Key");
    } else {
      sendData();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", boxShadow: "none" }}
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={5}>
          <div style={{ padding: "15px" }}>
            <Card className="login-card">
              <Typography
                style={{ marginBlock: "50px" }}
                variant="h5"
                className="text-center"
              >
                <img
                  src="https://www.webbrainstechnologies.com/wp-content/uploads/2016/02/logo-3.png"
                  height={"50px"}
                  width={"100px"}
                  alt=""
                  srcset=""
                />
              </Typography>

              <h3 className="m-4 text-center title">Hii, Welcome</h3>
              <CardMedia
                className="login-card-img"
                width="100%"
                component="img"
                height="100%"
                image="https://minimal-kit-react.vercel.app/static/illustrations/illustration_login.png"
                alt="green iguana"
              />
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={7} elevation={6} square>
          <Box
          className="registration-box"
            sx={{
              my: 4,
              mx: 4,
              px:20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullname"
                    required
                    fullWidth
                    id="key"
                    onChange={(e) => setKey(e.target.value)}
                    label="Secrate Key"
                    autoFocus
                    color={"primary"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    onChange={(e) => setname(e.target.value)}
                    label="Full Name"
                    autoFocus
                    color={"primary"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="role"
                    required
                    fullWidth
                    id="role"
                    onChange={(e) => setrole(e.target.value)}
                    label="Role"
                    autoFocus
                    color={"primary"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    onChange={(e) => setphone(e.target.value)}
                    label="Mobile Number"
                    name="phone"
                    color={"primary"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="mx-1 text-secondary">
                      Profile Picture
                    </Form.Label>
                    <Form.Control
                      type="file"
                      size="lg"
                      required
                      fullWidth
                      id="pic"
                      onChange={(e) => setpic(e.target.files[0])}
                      name="pic"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                    autoComplete="email"
                    color={"primary"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => setpass(e.target.value)}
                    id="password"
                    color={"primary"}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="conpass"
                    onChange={(e) => setconpass(e.target.value)}
                    label="Confirm Password"
                    type="password"
                    color={"primary"}
                    id="conpass"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                fullWidth
                className="my-4 w-100 btn"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Link
                    className="text-decoration-none"
                    href="/login"
                    variant="body2"
                  >
                    {"Already have an account? login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
