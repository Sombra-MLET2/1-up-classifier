import React, {useState, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {Box, TextField, Button} from '@mui/material';
import {insertMushroom} from '../redux/slices/mushroomSliceReducer';
import {AppDispatch} from '../redux/storeInitializer';
import {MushroomDTO} from '../types/mushroom';
import MenuBar from "./MenuBar";

const MushroomInsert: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [newMushroom, setNewMushroom] = useState<Partial<MushroomDTO>>({
        cap_diameter: 0,
        stem_height: 0,
        stem_width: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMushroom({...newMushroom, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(insertMushroom(newMushroom as MushroomDTO));
    };

    return (
        <>
            <MenuBar/>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    padding: 2,
                }}
            >
                <TextField name="cap_diameter" label="Cap Diameter" onChange={handleChange}/>
                <TextField name="stem_height" label="Stem Height" onChange={handleChange}/>
                <TextField name="stem_width" label="Stem Width" onChange={handleChange}/>

                <Button type="submit" variant="contained" color="primary">
                    Add Mushroom
                </Button>
            </Box>
        </>
    );
};

export default MushroomInsert;