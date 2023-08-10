import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {  Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector} from 'react-redux';
  


export default function ButtonAppBar() {
  const isLogged=useSelector((state)=>state.isLogged)
  console.log(isLogged)
  const[value,setValue]=useState()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,105,1) 35%, rgba(0,212,255,1) 100%)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BLOG
          </Typography>
         {isLogged && <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
            <Tabs textColor='#ffff' value={value}  onChange={(e,value)=>setValue(value)}   sx={{ color: '#ffff' }} TabIndicatorProps={{ style: { background: '#ffff' } }}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab  LinkComponent={Link} to="/myblogs"   label="My Blogs" />
            </Tabs>
          </Box>
}
          {!isLogged &&<> <Button 
          LinkComponent={Link} to="/auth"
          variant='contained' sx={{ color: "#fff", margin: 1 }}>Login</Button>

          <Button
          LinkComponent={Link} to="/auth"
           variant='contained' sx={{ color: "#fff" ,margin: 1 }}>Signup</Button> </>}
           { isLogged &&
          <Button variant='contained' sx={{ color: "#fff" }}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
