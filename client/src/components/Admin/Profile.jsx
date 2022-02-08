import { Card, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const Profile = () => {
    const id = localStorage.getItem("user")
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`)
            .then((res) => {
                setUser(res.data)
                if (window.document.referrer === "http://localhost:3000/login") {
                    toast.success("Successfully login");
                }
            })
            .catch((err) => console.log(err))
    }, []);
    return <div className=''>
        {
            user.length === 0 ?
                <div className="text-center">
                    <CircularProgress color="secondary" />
                </div> :
                <>
                    <div>
                        <div className="cover">
                        </div>
                        <Card className='profile admin row container'>
                            <div className='image-name m-4 col-1'>
                                <img className='my-4' src={user.pic} height={"100px"} width={"100px"} alt="" srcset="" />
                            </div>
                            <div className="name m-4 col-10">
                                <h4>{user.name}</h4>
                                <p className='text-secondary'>HR Manager</p>
                            </div>
                            <hr />
                            <div className="col-4">
                               <h5 className="title my-4 mx-0">Profile Deatils</h5>
                                {user.email}
                                <br />
                                {user.phone}
                                <br />
                                {user.role}
                            </div>
                            <div className="col-8">
                               <h5 className="title my-4"> Recently Added Application</h5>
                                <Grid className='row' spacing={2}>
                                    <Grid className='my-4' sm={6}>
                                        <Card className='p-3'>
                                            <p>React Full Stack Developer</p>
                                            <p>Name : Gohil Harsh</p>
                                            <p>Status : Pending</p>
                                            <p>Referance : no</p>
                                            <button className="btn">View Application</button>
                                        </Card>
                                    </Grid>
                                    <Grid className='my-4' sm={6}>
                                        <Card className='p-3'>
                                            <p>React Full Stack Developer</p>
                                            <p>Name : Gohil Harsh</p>
                                            <p>Status : Pending</p>
                                            <p>Referance : no</p>
                                            <button className="btn">View Application</button>

                                        </Card>
                                    </Grid> <Grid className='my-4' sm={6}>
                                        <Card className='p-3'>
                                            <p>React Full Stack Developer</p>
                                            <p>Name : Gohil Harsh</p>
                                            <p>Status : Pending</p>
                                            <p>Referance : no</p>
                                            <button className="btn">View Application</button>

                                        </Card>
                                    </Grid> <Grid className='my-4' sm={6}>
                                        <Card className='p-3'>
                                            <p>React Full Stack Developer</p>
                                            <p>Name : Gohil Harsh</p>
                                            <p>Status : Pending</p>
                                            <p>Referance : no</p>
                                            <button className="btn">View Application</button>

                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </div>
                </>
        }
    </div>;
};

export default Profile;
