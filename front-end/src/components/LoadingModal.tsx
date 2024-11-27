import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/storeInitializer';

const LoadingModal: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.dataset);

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
        <Typography id="loading-modal-description">Processing dataset request, please wait...</Typography>
      </Box>
    </Modal>
  );
};

export default LoadingModal;