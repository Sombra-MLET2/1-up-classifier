import React, {useState, FormEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, TextField, Box, Alert} from '@mui/material';
import {AppDispatch, RootState} from '../redux/storeInitializer';
import {login} from '../redux/slices/sessionSliceReducer';

// @ts-ignore
import Logo from '../assets/1up.png';
import {useNavigate} from "react-router-dom";
import MenuBar from "./MenuBar";

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const session = useSelector((state: RootState) => state.session);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({email, password}));
    };

    useEffect(() => {
        if (session.status === 'succeeded') {
            navigate('/search');
        }
    }, [session.status, navigate]);

    return (
        <>
            <MenuBar/>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >

                <img src={Logo} alt="Logo" style={{maxWidth: '256px', maxHeight: '256px', marginBottom: '20px'}}/>
                <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    {session.status === 'failed' && (
                        <Alert severity='error'>Login Failed. Please, check your credentials and try again.</Alert>
                    )}
                </Box>

                <TextField
                    label="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </Box>
        </>
    );
};

export default Login;