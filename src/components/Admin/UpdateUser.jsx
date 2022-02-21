import { React, useEffect, useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import axios from "axios";
import url from "../../config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsiveDrawer from "./SideBar"

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

export default function UpdateUser() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [pic, setpic] = useState("");
    const [pass, setpass] = useState("");
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    if (window.location.pathname === "/create-job-post") {
        toast.success("Create Job Successfully")
    }
    const handlePicDelete = (e) => {
        e.preventDefault()
        axios.delete(`${url}/pic/${id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then((res) => {
                toast.success("Picture Deleted Successfully")
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fatchData()
    },[]);
    const { id } = useParams()
    const fatchData = () => {
        axios.get(`${url}/user/${id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var data = new FormData();
        data.append("name", name !== "" ? name : user.name);
        data.append("email", email !== "" ? email : user.email);
        data.append("phone", phone !== "" ? phone : user.phone);
        data.append("pic", pic);
        data.append("profile", user.pic);
        data.append("role", user.role);
        data.append("pass", pass !== "" ? pass : user.pass);

        axios.post(`${url}/update-user/${id}`, data,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then((res) => {
                console.log(res);
                navigate("/profile")
            })
            .catch((value) => {
                console.log(value);
            })
    };

    return (
        <>
        <ResponsiveDrawer/>
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
                        {user.length === 0 ?
                            null :
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
                                        className="title text-center my-4 purple"
                                        sx={{ alignItems: "center" }}
                                    >
                                        Edit Profile
                                    </Typography>

                                    <TextField
                                        className="mt-4"
                                        required
                                        fullWidth
                                        defaultValue={user.name}
                                        id="name"
                                        onChange={(e) => setname(e.target.value)}
                                        label="Full Name"
                                        name="name"
                                        color={theme.secondary}
                                        sx={{ mb: 3 }}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        defaultValue={user.phone}
                                        id="phone"
                                        onChange={(e) => setphone(e.target.value)}
                                        label="Mobile Number"
                                        name="phone"
                                        color={theme.secondary}
                                        sx={{ mb: 3 }}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        defaultValue={user.email}
                                        type="email"
                                        id="email"
                                        onChange={(e) => setemail(e.target.value)}
                                        label="Email Address"
                                        name="email"
                                        color={theme.secondary}
                                        sx={{ mb: 3 }}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        defaultValue={user.pass}
                                        type="password"
                                        id="pass"
                                        onChange={(e) => setpass(e.target.value)}
                                        label="Password"
                                        name="pass"
                                        color={theme.secondary}
                                        sx={{ mb: 3 }}
                                    />
                                    {user.pic !== "" ? (
                                        <>
                                            <img
                                                className="mb-4"
                                                src={user.pic}
                                                height={"100px"}
                                                width={"100px"}
                                                alt=""
                                                srcset=""
                                            />
                                            <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); handlePicDelete(e) }}><DeleteIcon /></button>
                                        </>
                                    ) : (
                                        <input
                                            className="form-control mb-4"
                                            // textAlign="center"
                                            size="lg"
                                            type="file"
                                            onChange={(event) => setpic(event.target.files[0])}
                                        ></input>
                                    )}

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
                        }
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
        </>
    );
}
