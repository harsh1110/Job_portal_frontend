import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
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
const theme = createTheme();

export default function LoginPage() {
  // const window.location =  = usewindow.location = ()
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authUser, setAuthUser] = useState();

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
    const data = {
      email: email,
      pass: pass,
    };
    axios
      .post("http://localhost:5000/login", data)
      .then((value) => {
        setAuthUser(value.data);
        if (authUser) {
          localStorage.setItem("user", authUser._id);
          localStorage.setItem("role", authUser.role);
          if (authUser.role === "admin") {
            window.location = "/profile";
          } else {
            window.location = "/profile";
          }
        } else {
          if (authUser) {
            window.location = "/profile";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (window.document.referrer === "http://localhost:3000/profile") {
    toast.success("Successfully logout");
  }
  if (window.document.referrer === "http://localhost:3000/create-user`") {
    toast.success("Registration Successfully");
  }
  if (window.document.referrer === "http://localhost:3000/Log%20Out`") {
    toast.success("Successfully Logout");
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main"  sx={{ height: "100vh",boxShadow:"none" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          // sx={{
          //   backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
          //   backgroundRepeat: 'no-repeat',
          //   backgroundColor: (t) =>
          //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          // }}
        >
          <div style={{padding:"15px",height:"100%"}}>
          <Card style={{ height: "100%" }}>
            <CardMedia
            width="80%"
              component="img"
              height="100%"
              backgroundSize={'cover'}
              image="https://minimal-kit-react.vercel.app/static/illustrations/illustration_login.png"
              alt="green iguana"
            />
          </Card>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={7} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                type="submit"
                fullWidth
                variant="contained"
                // color='secondary'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
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
