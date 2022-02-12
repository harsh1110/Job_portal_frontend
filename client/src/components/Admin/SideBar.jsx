import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TopSection from './TopSection'
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import TocIcon from '@mui/icons-material/Toc';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container'
import { Card, Grid } from '@mui/material';
import axios from 'axios';
import url from '../../config';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 250;

function ResponsiveDrawer(props) {
    const [active, setActive] = React.useState("");
    const id = localStorage.getItem("user")
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = React.useState([]);
    const [all, setall] = React.useState([])
    var jobIds = []
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    React.useEffect(() => {
        setActive(window.location.pathname)
        console.log(active);
        axios.get(`${url}/user/${id}`)
            .then((value) => {
                setUser(value.data)
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(`${url}/job/all`)
            .then((value) => {
                setall(value.data)
            })
            .catch((err) => {
                console.log(err);
            })
       
    }, []);
    const icon = [<PersonIcon />, <DashboardIcon />, <AddIcon />, <TocIcon />,<PeopleIcon/>, <LogoutIcon />]
    const locations = ['/Profile', '/Dashboard', '/Create%20Job%20Post', "/Job%20Listing","/All%20Applicants", "/Log%20Out"]
    all.map((job) => {
        jobIds.push(`/jobdetails/${job._id}`);
        // console.log(jobIds);
    })
        jobIds.map((jobpath) => {
            if (active === jobpath) {
                document.getElementById("Jo").classList.add("active")
                document.getElementById("Job").classList.add("active")
            }
        })
    
    const drawer = (
        <div>
            <Typography variant='h5' className='my-4 text-center'><img src="https://www.webbrainstechnologies.com/wp-content/uploads/2016/02/logo-3.png" height={"50px"} width={"100px"} alt="" srcset="" /></Typography>
            {/* <Container maxWidth="lg"> */}
            <Card className='user-card mx-2'>
                <Grid className='d-flex' xs={12}>
                    <img className='m-3' src={user.pic} height={"45px"} width={"45px"} alt="" />
                    <Typography marginTop={"25px"} marginLeft={"10px"} fontWeight={600}>{user.name}</Typography>
                </Grid>
            </Card>
            {/* </Container> */}
            <List>
                {['Profile', 'Dashboard', 'Create Job Post', "Job Listing","All Applicants", "Log Out"].map((text, index) => (
                    <a className='text-decoration-none text-dark' onClick={(e) => (window.location.reload())} href={`/${text}`}>
                        {
                            active === locations[index] ?
                                <ListItem className='active' id={text.slice(0, 2)} name={text} button key={text}>
                                    <ListItemIcon id={text.slice(0, 3)} className='active'>
                                        {icon[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                                :
                                <ListItem name={text} id={text.slice(0, 2)} button key={text}>
                                    <ListItemIcon id={text.slice(0, 3)}>
                                        {icon[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                        }
                    </a>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                className='navbar'
                position="fixed"
                sx={{
                    width: { sm: `calc(100%)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
