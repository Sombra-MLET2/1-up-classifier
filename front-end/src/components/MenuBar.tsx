import React from 'react';
import {AppBar, Toolbar, Typography, Menu, MenuItem, Button, Box} from '@mui/material';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// @ts-ignore
import Logo from '../assets/1up.png';
import LoadingModal from "./LoadingModal";
import {useDispatch, useSelector} from "react-redux";
import {deleteDataset, importDataset} from "../redux/slices/datasetSliceReducer";
import {AppDispatch, RootState} from "../redux/storeInitializer";
import {MushroomDTO} from "../types/mushroom";
import {fetchMushrooms} from "../redux/slices/mushroomSliceReducer";
import {logoff} from "../redux/slices/sessionSliceReducer";

const MenuBar: React.FC = () => {
    const [anchorElDataset, setAnchorElDataset] = useState<null | HTMLElement>(null);
    const [anchorElMushrooms, setAnchorElMushrooms] = useState<null | HTMLElement>(null);
    const [queryParams, setQueryParams] = useState<Partial<MushroomDTO>>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const session = useSelector((state: RootState) => state.session);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menu: string) => {
        if (menu === 'dataset') {
            setAnchorElDataset(event.currentTarget);
        } else if (menu === 'mushrooms') {
            setAnchorElMushrooms(event.currentTarget);
        }
    };

    const handleMenuClose = () => {
        setAnchorElDataset(null);
        setAnchorElMushrooms(null);
        dispatch(fetchMushrooms(queryParams));
    };

    const handleImport = () => {
        dispatch(importDataset(session.user?.access_token));
        handleMenuClose();
        dispatch(fetchMushrooms(queryParams));
    };

    const handleDelete = () => {
        dispatch(deleteDataset(session.user?.access_token));
        handleMenuClose()
    };

    const handleLogoff = () => {
        dispatch(logoff());
        navigate('/', {replace: true});
    }

    return (
        <AppBar position="static">
            <LoadingModal/>
            <Toolbar>
                <Box sx={{display: 'flex', alignItems: 'center', paddingRight: '15px'}}>
                    <img src={Logo} alt="Logo" style={{maxWidth: '50px', maxHeight: '50px', marginRight: '10px', cursor: 'pointer'}} onClick={() => navigate('/')} />
                    <Typography variant="h6">
                        Safety Classifier
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', paddingLeft: '50px'}}>
                    {session.status === 'succeeded' && (
                        <>
                            <Button
                                aria-controls="dataset-menu"
                                aria-haspopup="true"
                                onClick={(event) => handleMenuOpen(event, 'dataset')}
                                color="inherit"
                            >
                                Dataset
                            </Button>
                            <Menu
                                id="dataset-menu"
                                anchorEl={anchorElDataset}
                                keepMounted
                                open={Boolean(anchorElDataset)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleImport}>Import</MenuItem>
                                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            </Menu>
                        </>
                    )}
                    <Button
                        aria-controls="mushrooms-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleMenuOpen(event, 'mushrooms')}
                        color="inherit"
                        sx={{marginLeft: '20px'}}
                    >
                        Mushrooms
                    </Button>
                    <Menu
                        id="mushrooms-menu"
                        anchorEl={anchorElMushrooms}
                        keepMounted
                        open={Boolean(anchorElMushrooms)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose} component={Link} to="/search">Search</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/predict">Predict</MenuItem>
                        {session.status === 'succeeded' && (
                            <MenuItem onClick={handleMenuClose} component={Link} to="/insert">Insert</MenuItem>
                        )}
                    </Menu>
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <Box>
                    {session.status === 'succeeded' && (
                        <Button color="inherit" onClick={handleLogoff}>Logoff</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;