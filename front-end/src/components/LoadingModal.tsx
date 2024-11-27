import React from 'react';
import {Modal, Box, Typography, Stack, LinearProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/storeInitializer';

const LoadingModal: React.FC = () => {
    const {loading} = useSelector((state: RootState) => state.dataset);

    return (
        <Modal
            open={loading}
            aria-labelledby="loading-modal-title"
            aria-describedby="loading-modal-description"
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >

                <Stack sx={{width: '50%', color: 'grey.500', textAlign: 'center'}} spacing={2}>
                    <Typography id="loading-modal-description" style={{color: 'white', fontWeight: 'bold'}}>🍄 Processing dataset request, please wait...</Typography>
                    <LinearProgress color="success"/>
                </Stack>

            </Box>
        </Modal>
    );
};

export default LoadingModal;