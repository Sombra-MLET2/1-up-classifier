import React from 'react';
import MenuBar from "./MenuBar";
import {Typography} from "@mui/material";

const MushroomPredict: React.FC = () => {
    return (
        <>
            <MenuBar/>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Mushroom Safety Prediction
            </Typography>
        </>
    )
}

export default MushroomPredict;