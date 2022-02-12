import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import url from "../../config";
import fronturl from "../../config"
const theme = createTheme({
  palette: {
    primary: {
      main: "#2d82f8"
    },
    secondary: {
      main: "rgb(196,209,64)"
    },
  },
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authUser, setAuthUser] = useState();
  const [toaster, settoaster] = useState(true);
  var msg = []


  // console.log(window.location = );
  // var token = "harsh"
  // const { decodedToken, isExpired } = useJwt(token);
  // if(authUser){
  //   token = authUser._id
  // }
  // console.log(decodedToken);
  // console.log(isExpired);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "" || pass === "") {
      toast.error("Fields Can not be Empty")
    }
    else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)) {
      toast.error("email is not valid...!!");
    }
    else {
      const data = {
        email: email,
        pass: pass,
      };
      axios
        .post(`${url}/login`, data)
        .then((value) => {
          setAuthUser(value.data);
          if (authUser) {
            localStorage.setItem("user", authUser._id);
            localStorage.setItem("role", authUser.role);
            window.location = "/profile";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  if (toaster) {
    if (window.document.referrer === `http://localhost:3000/create-user`) {
      console.log("hiii");
      toast.success("Registration Successfully");
    }
    if (window.document.referrer === `http://localhost:3000/Log%20Out`) {
      toast.success("Successfully Logout");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", boxShadow: "none" }}>
        <CssBaseline />
        <Grid
          item
          xs={0}
          md={5}
        >
          <div style={{ padding: "15px" }}>
            <Card className="login-card">
              <Typography style={{ marginBlock: "50px" }} variant='h5' className='text-center'><img src="https://www.webbrainstechnologies.com/wp-content/uploads/2016/02/logo-3.png" height={"50px"} width={"100px"} alt="" srcset="" /></Typography>

              <h3 className="m-4 text-center title">Hello Welcome Back</h3>
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
        <Grid item xs={12} md={7} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 , bgcolor: "primary.main" }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => { setEmail(e.target.value); settoaster(false) }}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                className="btn"
                type="submit"
                fullWidth
                variant="contained"
                // color='secondary'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Link
                    className="text-decoration-none"
                    href="/create-user"
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
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
