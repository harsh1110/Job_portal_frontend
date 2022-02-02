import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TopSection = () => {



    const id = localStorage.getItem("user")
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`)
        .then((res) => {
            setUser(res.data)
        })
        .catch((err)=>console.log(err))
    }, []);

    return <div className="admin container px-4">
        <h2 className="text-center text-warning my-4">Hello {user.name}</h2>
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} md={6}>
                <div style={{borderRadius:"35px"}} className="card green text-center py-2">
                    <h4 className='my-4'>Total Job Posts</h4>
                    <h5 className='my-4'>4560</h5>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{borderRadius:"35px"}} className="card green text-center py-2">
                    <h4 className='my-4'>Total Job Seekers</h4>
                    <h5 className='my-4'>500</h5>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{borderRadius:"35px"}} className="card green text-center py-2">
                    <h4 className='my-4'>Total Job Posts</h4>
                    <h5 className='my-4'>4560</h5>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{borderRadius:"35px"}} className="card green text-center py-2">
                    <h4 className='my-4'>Total Job Posts</h4>
                    <h5 className='my-4'>4560</h5>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{borderRadius:"35px"}} className="card green text-center py-2">
                    <h4 className='my-4'>Total Company</h4>
                    <h5 className='my-4'>80</h5>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <div style={{borderRadius:"35px"}} className="card green text-center py-2">
                    <h4 className='my-4'>Total Company</h4>
                    <h5 className='my-4'>80</h5>
                </div>
            </Grid>
        </Grid>
    </div>;
};

export default TopSection;
