import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import url from "../../config";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "./SideBar";



const Profile = ({name}) => {
  const navigate = useNavigate()
  console.log(name);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const id = localStorage.getItem("user");
  const [user, setUser] = useState([]);
  const [recentdata, setRecenteData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newname, setnewname] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newphone, setnewphone] = useState("");
  const handleClose = () => setOpen(false);
  

  useEffect(() => {
    if (window.document.referrer === "http://localhost:3000/login") {
      toast.success("Successfully login");
    }
    axios.get(`${url}/user/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
      .then((res) => {
       if(res.data.message === "Access Denied"){
         navigate("/login")
       }
        
        setUser(res.data);
      })
      .catch((err) => console.log(err));
    axios.get(`${url}/job/apply/all`,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
      .then((res) => {
        setRecenteData(res.data.slice(-4).reverse());
      })
      .catch((err) => console.log(err));
  }, [id]);



  return (
    <div>
      <ResponsiveDrawer />
      {user.length === 0 ? (
        <div className="text-center">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <div>
            <div className="cover"></div>
            <Card className="profile admin row container mb-4">
              <Grid container spacing={2}>
                <Grid item className="image-name" xs={12} sm={1}>
                  <img
                    className="my-4"
                    src={user.pic}
                    height={"100px"}
                    width={"100px"}
                    alt=""
                    srcset=""
                  />
                </Grid>
                <Grid item className="name mx-4" xs={12} sm={8}>
                  <h4>{user.name}</h4>
                  <p className="text-secondary">{user.role}</p>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <h5 className="title my-4 mx-0">Profile Details</h5>

                  <Typography
                    variant="h6"
                    className="mt-2"
                    sx={{ textAlign: "left" }}
                  >
                    <EmailIcon color="primary" /> &nbsp;&nbsp;&nbsp;{user.email}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-2"
                    sx={{ textAlign: "left" }}
                  >
                    <PhoneIcon color="primary" /> &nbsp;&nbsp;&nbsp;{user.phone}
                  </Typography>
                  <Button
                    className="btn m-4 text-white"
                    onClick={(e) => (navigate(`/update/${user._id}`))}
                  >
                    <EditIcon />
                    &nbsp;&nbsp;Edit Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <h5 className="title my-4 mx-0">
                    {" "}
                    Recently Added Application
                  </h5>
                  <Grid className="row" spacing={2}>
                    {recentdata.map((application) => (
                      <Grid className="my-4" sm={6}>
                        <Card className="app-card p-3">
                          <p className="designation">
                            {application.designation}
                          </p>
                          <p>Name :- {application.name}</p>
                          {application.ApplicationStatus === 'Approve' ?
                            <p >Status :- <span className="text-success" > {application.ApplicationStatus} </span></p>
                            : null}
                          {application.ApplicationStatus === 'Reject' ?
                            <p >Status :- <span className="text-danger" > {application.ApplicationStatus} </span></p>
                            : null}
                          {application.ApplicationStatus === 'Pending' ?
                            <p >Status :- <span className="text-warning" > {application.ApplicationStatus} </span></p>
                            : null}
                          <p >Employee Status :- {application.employStatus}</p>


                          <button onClick={(e) => (navigate(`/candidatedetails/${application._id}`))} className="btn text-white">
                            View Application
                          </button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
