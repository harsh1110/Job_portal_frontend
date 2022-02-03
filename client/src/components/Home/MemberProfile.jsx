import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";

const MemberProfile = () => {
  const id = localStorage.getItem("user");
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin row  container" >
      {user.length === 0 ? (
        <div className="text-center">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <div className="col-4">
            <img
              className="my-4 "
              
              src={user.pic}
              style={{ borderRadius: "50%", border: "5px double purple" }}
              height={"250px"}
              width={"250px"}
              alt=""
              srcset=""
            />
          </div>
          <div className="col-lg-6 col-xs-12 my-4 ">
            <h1 className="purple my-4">{user.name}</h1>
            <h5 className="purple my-4">
              <EmailIcon />
              &nbsp;&nbsp;&nbsp;{user.email}
            </h5>
            <h5 className="purple">
              <PhoneIcon />
              &nbsp;&nbsp;&nbsp;{user.phone}
            </h5>
          </div>
          <div className="col-4"></div>
          <div className="col-6">
            <button className="btn btn-lg text-white">
              <EditIcon />
              &nbsp;&nbsp;Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberProfile;
