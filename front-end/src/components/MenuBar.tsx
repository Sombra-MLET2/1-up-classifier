import React from 'react';
import {AppBar, Toolbar, Typography, Menu, MenuItem, Button, Box} from '@mui/material';
import {useState} from 'react';
import {Link} from 'react-router-dom';

// @ts-ignore
import Logo from '../assets/1up.png';

const MenuBar: React.FC = () => {
    const [anchorElDataset, setAnchorElDataset] = useState<null | HTMLElement>(null);
    const [anchorElMushrooms, setAnchorElMushrooms] = useState<null | HTMLElement>(null);

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
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{display: 'flex', alignItems: 'center', paddingRight: '15px'}}>
                    <img src={Logo} alt="Logo" style={{maxWidth: '50px', maxHeight: '50px', marginRight: '10px'}}/>
                    <Typography variant="h6">
                        Safety Classifier
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', paddingLeft: '50px'}}>
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
                        <MenuItem onClick={handleMenuClose} component={Link} to="/import">Import</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/delete">Delete</MenuItem>
                    </Menu>
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
                        <MenuItem onClick={handleMenuClose} component={Link} to="/insert">Insert</MenuItem>
                    </Menu>
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <Box>
                    <Button color="inherit">Logoff</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;