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

const Profile = () => {
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
  const [newpic, setnewpic] = useState("");
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (window.document.referrer === "http://localhost:3000/login") {
      toast.success("Successfully login");
    }
    axios
      .get(`${url}/user/${id}`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${url}/job/apply/all`)
      .then((res) => {
        setRecenteData(res.data.slice(-4).reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModal = (e, id) => {
    setOpen(true);
  };

  const handleEditProfile = (e, id) => {
    const id1 = user._id;
    var data = new FormData();
    data.append("newname", newname ? newname : user.name);
    data.append("newemail", newemail ? newemail : user.email);
    data.append("newphone", newphone ? newphone : user.phone);
    data.append("newpic", newpic ? newpic : user.pic);
    data.append("newpass", user.pass);
    data.append("newconpass", user.conpass);

    for (let i = 0; i < user.pic.length; i++) {
      data.append("pic", user.pic[i]);
    }

    axios.post(`${url}/update-user/${id1}`, data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="">
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
                  <p className="text-secondary">HR Manager</p>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <h5 className="title my-4 mx-0">Profile Deatils</h5>

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
                    onClick={(e) => handleModal(e, user._id)}
                  >
                    <EditIcon />
                    &nbsp;&nbsp;Edit Profile
                  </Button>
                </Grid>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div style={{ textAlign: "center" }}>
                      <Typography variant="h6" color="blue" className="mb-2">
                        Edit Profile
                      </Typography>
                      <input
                        fullWidth
                        defaultValue={user.name}
                        onChange={(event) => setnewname(event.target.value)}
                      ></input>
                      <br />
                      <br />
                      <input
                        defaultValue={user.email}
                        onChange={(event) => setnewemail(event.target.value)}
                      ></input>
                      <br />
                      <br />
                      <input
                        defaultValue={user.phone}
                        onChange={(event) => setnewphone(event.target.value)}
                      ></input>
                      <br />
                      <br />
                      {user.pic ? (
                        <img
                          src={user.pic}
                          height={"70px"}
                          width={"70px"}
                          alt=""
                          srcset=""
                        />
                      ) : (
                        <input
                          // textAlign="center"
                          type="file"
                          onChange={(event) => setnewpic(event.target.files[0])}
                        ></input>
                      )}
                      <br />
                      <br />

                      <Button
                        variant="contained"
                        onClick={(e) => {
                          handleEditProfile(e);
                          handleClose();
                        }}
                      >
                        Ok
                      </Button>
                    </div>
                  </Box>
                </Modal>
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
                          <p>Status :- {application.ApplicationStatus}</p>
                          <p>Employee Status :- {application.employStatus}</p>
                          <button className="btn text-white">
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
