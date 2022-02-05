import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, authError, authInfo, resetPassword } = useAuth();


    const location = useLocation();
    const navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }

    const handleResetPassword = e =>{
        resetPassword(loginData.email);
        e.preventDefault();
    }


    return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" className='mb-5 pb-5'>
                    <CssBaseline />
                    <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', marginTop:'10px'}}>
                    {isLoading && <CircularProgress />} <br />
                    {authError && <Alert variant="filled" severity="error">{authError}</Alert>}
                    {authInfo && <Alert variant="filled" severity="info">{authInfo}</Alert>}
                    </Box>
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 3
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleOnChange}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleOnChange}
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={handleResetPassword} sx={{textDecoration:'none', cursor:"pointer"}} variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <NavLink to='/register' style={{textDecoration:'none'}}>
                                        <Link style={{textDecoration:'none'}} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                        </Link>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
    );
};

export default Login;