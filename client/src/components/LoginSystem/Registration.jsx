import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from 'react-bootstrap';
import { deepPurple, purple } from '@mui/material/colors';
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import Resizer from 'react-image-file-resizer'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const theme = createTheme(
    {
        palette: {
            primary: deepPurple,
            secondary: purple,
        },
    }
);

export default function Registration() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [pic, setpic] = useState()
    const [imgpath, setimgpath] = useState("")
    const [pass, setpass] = useState("");
    const [role, setrole] = useState("");
    const [conpass, setconpass] = useState("");
    const [data, setdata] = useState();
    const [key, setKey] = useState("");
    // var value = {}
    useEffect(() => {
        axios.get("http://localhost:5000/all")
            .then((value) => {
                setdata(value.data)
            })
    }, []);


    var sendData = () => {
        const dat = {
            "name": name,
            "email": email,
            "phone": phone,
            "pic": imgpath,
            "pass": pass,
            "role": role
        }
        console.log(imgpath);
        axios.post("http://localhost:5000/add-user", dat)
            .then(res => {
                alert('Data send successfully...!!')
                window.location = "/login"
            })
            .catch(err => console.log(err))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        Resizer.imageFileResizer(
            pic,
            480,
            480,
            "JPEG",
            100,
            0,
            (uri) => { setimgpath(uri) })
        var emaildata = []
        if (data.length === 0) {
            emaildata = []
        }
        else {
            data.map((item) => (
                emaildata.push(item.email)
            ))
        }

        if (name === "" || email === "" || phone === "" || pic === "" || pass === "" || conpass === "") {
            alert("fields can not Empty...!!")
        }
        else if (!(/[a-zA-Z]{5}/).test(name)) {
            alert("Name is not valid...!!")
        }
        else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/).test(email)) {
            alert("email is not valid...!!")
        }
        else if (emaildata.includes(email)) {
            alert("email is already exist..!!")
        }
        else if (!(/[0-9]{10}/).test(phone)) {
            alert(" mobile number is invalid")
        }
        else if (!(/[a-zA-Z0-9]{8}/).test(pass)) {
            alert("Password must be more then or equal to 8 character")
        }
        else if (pass !== conpass) {
            alert("password Does't Match try again..")
        }
        else if(role === "admin"){
            if(key !== "harsh123"){
                alert("Enter Valid Secrate Key")
            }
        }
        else {
            sendData()
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="role"
                                        label="Role"
                                        onChange={(e) => (setrole(e.target.value))}
                                    >
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"member"}>Job Seeker</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            {role === "admin" ?
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="fullname"
                                        required
                                        fullWidth
                                        id="key"
                                        onChange={(e) => (setKey(e.target.value))}
                                        label="Secrate Key"
                                        autoFocus
                                        color={"secondary"}
                                    />
                                </Grid> :
                                null

                            }

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="fullname"
                                    onChange={(e) => (setname(e.target.value))}
                                    label="Full Name"
                                    autoFocus
                                    color={"secondary"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    onChange={(e) => (setphone(e.target.value))}
                                    label="Mobile Number"
                                    name="phone"
                                    color={"secondary"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    type="file"
                                    required
                                    fullWidth
                                    id="pic"
                                    onChange={(e) => (setpic(e.target.files[0]))}
                                    name="pic"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={(e) => (setemail(e.target.value))}
                                    autoComplete="email"
                                    color={"secondary"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={(e) => (setpass(e.target.value))}
                                    id="password"
                                    color={"secondary"}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="conpass"
                                    onChange={(e) => (setconpass(e.target.value))}
                                    label="Confirm Password"
                                    type="password"
                                    color={"secondary"}
                                    id="conpass"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            className='my-4 w-100 btn'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}