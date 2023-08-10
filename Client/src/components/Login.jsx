import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { authActions } from "../components/store/index";
import { useNavigate } from "react-router-dom";

import axios from "axios"

const MyForm = () => {
   const dispath=useDispatch()
   const naviagte = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', // Separate state for password
        confirmPassword: '', // Separate state for confirm password
    });

  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const sendRequest = async (type="login") => {
        const res = await axios
          .post(`http://localhost:5000/api/user/${type}`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
          .catch((err) => console.log(err));
    
        const data = await res.data;
        // console.log(data);
        return data;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isSignup) {
          sendRequest("signup")
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(authActions.login()))
            .then(() => naviagte("/blogs"));
        } else {
          sendRequest()
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(authActions.login()))
            .then(() => naviagte("/blogs"));
        }
      };
    const handleSwitch = () => {
        setIsSignup(!isSignup);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                {isSignup ? "Signup" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {isSignup && (
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                    )}
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                   
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button sx={{ borderRadius: 2 }} onClick={handleSwitch}>
                        Switch To {isSignup ? "Login" : "Signup"}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default MyForm;
