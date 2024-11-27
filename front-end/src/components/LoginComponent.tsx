import React, {useState, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {Button, TextField, Box, Menu} from '@mui/material';
import {AppDispatch} from '../redux/storeInitializer';
import {login} from '../redux/slices/sessionSliceReducer';

// @ts-ignore
import Logo from '../assets/1up.png';

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({username, password}));
    };

    return (
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

            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
    );
};

export default Login;