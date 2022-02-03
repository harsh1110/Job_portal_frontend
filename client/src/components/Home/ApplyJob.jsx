import * as React from "react";
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

const theme = createTheme();

export default function ApplyJob() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mobile number"
                  label="Mobile Number"
                  id="mobilenumber"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mobile number"
                  label="What Position Are You Applying For?"
                  id="mobilenumber"
                  autoComplete="new-password"
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
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="employed"
                    control={<Radio />}
                    label="Employed"
                  />
                  <FormControlLabel
                    value="selfemployed"
                    control={<Radio />}
                    label="Self-Employed"
                  />
                  <FormControlLabel
                    value="unemployed"
                    control={<Radio />}
                    label="Un-Employed"
                  />
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                </RadioGroup>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" >
                  Submit Your Resume
                </FormLabel>
                <Grid item xs={12} >
                <input type='file'></input>
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
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
