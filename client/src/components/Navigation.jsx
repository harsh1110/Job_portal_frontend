import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import axios from 'axios';

const settings = ['Profile', 'All Job List', 'Applied Job', 'Logout'];
const withoutAuth = ['Login', 'Register'];

const Navigation = () => {
  const [authUser, setauthUser] = React.useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  

const getData = () => {
  axios.get(`http://localhost:5000/user/${date}`)
      .then((value) => {
        setauthUser(value.data)
      })
      .catch((err) => {
        console.log(err);
      })
}
  if(localStorage.getItem("user")) {
    const id = localStorage.getItem("user")
    var date = id.slice(1, id.length-1)
    // getData()
  };





  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e,name) => {
      e.preventDefault()
      if(name==="Logout") {
          localStorage.clear()
          window.location = "/login"
      }
      else if(name==="Login") {
          window.location = "/login"
      }
      else if(name === "Register"){
          window.location = "/create-user"
      }
      else{
        window.location = `/${name}`
      }
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static" className='navbar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // style={{color:"green"}}
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Job Portal
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Job Portal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          {
              localStorage.getItem("user")?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{ bgcolor: "pink" }} src={authUser.pic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e)=>(handleCloseUserMenu(e,setting))}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          :
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {withoutAuth.map((setting) => (
                <MenuItem key={setting} onClick={(e)=>(handleCloseUserMenu(e,setting))}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
