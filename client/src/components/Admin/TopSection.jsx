import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const TopSection = () => {
    const id = localStorage.getItem("user")
    const [user, setUser] = useState([]);
    const [totalapplication,settotalapplication] = useState("");
    const [pendingapplication,setpendingapplication] = useState("");
    const [approveapplication,setapproveapplication] = useState("");
    const [rejectapplication,setrejectapplication] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`)
            .then((res) => {
                setUser(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))

            axios.get(`http://localhost:5000/job/apply/all`)
            .then((res) => {
                settotalapplication(res.data.length)
            })
            .catch((err) => console.log(err))
            axios.get(`http://localhost:5000/job/apply/status/pending`)
            .then((res) => {
                setpendingapplication(res.data.length)
            })
            .catch((err) => console.log(err))
            axios.get(`http://localhost:5000/job/apply/status/approve`)
            .then((res) => {
                setapproveapplication(res.data.length)
            })
            .catch((err) => console.log(err))
            axios.get(`http://localhost:5000/job/apply/status/reject`)
            .then((res) => {
                setrejectapplication(res.data.length)
            })
            .catch((err) => console.log(err))
    }, []);
    return <div className="admin container px-4">
        <h2 className="text-start title">Hii, {user.name}</h2>
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} md={3}>
                <div style={{ borderRadius: "15px" }} className="card blue text-center py-2">
                    <h4 className='blue-icon text-center my-4'><AccountCircleOutlinedIcon /></h4>
                    <h3 className='number mt-2'>{totalapplication}</h3>
                    <p className='sub-title mb-4'>Total Applicatios</p>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{ borderRadius: "15px" }} className="card yellow text-center py-2">
                    <h4 className='yellow-icon text-center my-4'><AccessTimeIcon /></h4>
                    <h3 className='number mt-2'>{pendingapplication}</h3>
                    <p className='sub-title mb-4'>Pending Applications</p>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{ borderRadius: "15px" }} className="card green text-center py-2">
                    <h4 className='green-icon text-center my-4'><CheckCircleOutlineOutlinedIcon /></h4>
                    <h3 className='number mt-2'>{approveapplication}</h3>
                    <p className='sub-title mb-4'>Approved Applications</p>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{ borderRadius: "15px" }} className="card red text-center py-2">
                    <h4 className='red-icon text-center my-4'><HighlightOffOutlinedIcon /></h4>
                    <h3 className='number mt-2'>{rejectapplication}</h3>
                    <p className='sub-title mb-4'>Rejected Application</p>
                </div>
            </Grid>
        </Grid>
    </div>;
};

export default TopSection;
