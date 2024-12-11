import React, {useState, FormEvent, ReactNode, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Alert, Typography
} from '@mui/material';
import {insertMushroom} from '../redux/slices/mushroomSliceReducer';
import {AppDispatch, RootState} from '../redux/storeInitializer';
import {
    MushroomDTO,
    CapShapeEnum,
    CapSurfaceEnum,
    CapColorEnum,
    DoesBruiseBleedEnum,
    GillAttachmentEnum,
    StemRootEnum,
    VeilTypeEnum,
    RingTypeEnum,
    HabitatEnum,
    SeasonEnum,
    GillSpacingEnum,
    HasRingEnum,
    GillSpacingEnumToString,
    HasRingEnumToString,
    CapShapeEnumToString,
    CapSurfaceEnumToString,
    CapColorEnumToString,
    DoesBruiseBleedEnumToString,
    GillAttachmentEnumToString,
    StemRootEnumToString,
    VeilTypeEnumToString,
    RingTypeEnumToString,
    HabitatEnumToString,
    SeasonEnumToString, ClassEnum, ClassEnumToString
} from '../types/mushroom';
import MenuBar from "./MenuBar";
import {useNavigate} from "react-router-dom";

const MushroomInsert: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const addedMushroom = useSelector((state: RootState) => state.mushroom.status)
    const session = useSelector((state: RootState) => state.session.user);
    const navigate = useNavigate();
    const [newMushroom, setNewMushroom] = useState<Partial<MushroomDTO>>({
        cap_diameter: 0,
        stem_height: 0,
        stem_width: 0,
    });

    useEffect(() => {
        if (addedMushroom === 'inserted') {
            setTimeout(() => {
                navigate('/search');
            }, 3000);
        }
    }, [addedMushroom, navigate])

    const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
        const {name, value} = e.target;
        setNewMushroom(prevState => ({...prevState, [name as string]: value}));
    };

    const handleSliderChange = (name: string) => (event: Event, value: number | number[]) => {
        setNewMushroom({...newMushroom, [name]: value as number});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(insertMushroom({
            mushroom: newMushroom as MushroomDTO,
            token: session?.access_token
        }));
    };

    return (
        <>
            <MenuBar/>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Mushroom Register
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                {addedMushroom === 'failed' && (
                    <Alert severity='error'>Mushroom creation failed. Please, try again later.</Alert>
                )}
                {addedMushroom === 'inserted' && (
                    <Alert severity='success'>Mushroom created successfully! You are being redirect....</Alert>
                )}
            </Box>
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

                <FormControl>
                    <InputLabel id="mushroom-class-label">Class</InputLabel>
                    <Select
                        labelId="mushroom-class-label"
                        name="mushroom_class"
                        label="Class"
                        onChange={handleChange}
                        value={newMushroom.mushroom_class || ''}
                    >
                        {Object.entries(ClassEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {ClassEnumToString[value as ClassEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{m: 1}}>
                    <InputLabel id="cap-diameter-slider-label">Cap Diameter ({newMushroom.cap_diameter} cm)</InputLabel>
                    <Slider
                        name="cap_diameter"
                        aria-labelledby="cap-diameter-slider-label"
                        value={newMushroom.cap_diameter || 0}
                        onChange={handleSliderChange('cap_diameter')}
                        step={0.1}
                        min={0.0}
                        max={125.0}
                        valueLabelDisplay="auto"
                    />
                </FormControl>

                <FormControl>
                    <InputLabel id="cap-shape-label">Cap Shape</InputLabel>
                    <Select
                        labelId="cap-shape-label"
                        name="cap_shape"
                        onChange={handleChange}
                        value={newMushroom.cap_shape || ''}
                    >
                        {Object.entries(CapShapeEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapShapeEnumToString[value as CapShapeEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="cap-surface-label">Cap Surface</InputLabel>
                    <Select
                        labelId="cap-surface-label"
                        name="cap_surface"
                        onChange={handleChange}
                        value={newMushroom.cap_surface || ''}
                    >
                        {Object.entries(CapSurfaceEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapSurfaceEnumToString[value as CapSurfaceEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="cap-color-label">Cap Color</InputLabel>
                    <Select
                        labelId="cap-color-label"
                        name="cap_color"
                        onChange={handleChange}
                        value={newMushroom.cap_color || ''}
                    >
                        {Object.entries(CapColorEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapColorEnumToString[value as CapColorEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="bruise-bleed-label">Bruise or Bleed?</InputLabel>
                    <Select
                        labelId="bruise-bleed-label"
                        name="does_bruise_bleed"
                        onChange={handleChange}
                        value={newMushroom.does_bruise_bleed || ''}
                    >
                        {Object.entries(DoesBruiseBleedEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {DoesBruiseBleedEnumToString[value as DoesBruiseBleedEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="gill-attachment-label">Gill Attachment</InputLabel>
                    <Select
                        labelId="gill-attachment-label"
                        name="gill_attachment"
                        onChange={handleChange}
                        value={newMushroom.gill_attachment || ''}
                    >
                        {Object.entries(GillAttachmentEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {GillAttachmentEnumToString[value as GillAttachmentEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="gill-spacing-label">Gill Spacing</InputLabel>
                    <Select
                        labelId="gill-spacing-label"
                        name="gill_spacing"
                        onChange={handleChange}
                        value={newMushroom.gill_spacing || ''}
                    >
                        {Object.entries(GillSpacingEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {GillSpacingEnumToString[value as GillSpacingEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="gill-color-label">Gill Color</InputLabel>
                    <Select
                        labelId="gill-color-label"
                        name="gill_color"
                        onChange={handleChange}
                        value={newMushroom.gill_color || ''}
                    >
                        {Object.entries(CapColorEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapColorEnumToString[value as CapColorEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{m: 1}}>
                    <InputLabel id="stem-height-slider-label">Stem Height ({newMushroom.stem_height} cm)</InputLabel>
                    <Slider
                        name="stem_height"
                        aria-labelledby="stem-height-slider-label"
                        value={newMushroom.stem_height || 0}
                        onChange={handleSliderChange('stem_height')}
                        step={0.1}
                        min={0.0}
                        max={125.0}
                        valueLabelDisplay="auto"
                    />
                </FormControl>

                <FormControl sx={{m: 1}}>
                    <InputLabel id="stem-width-slider-label">Stem Width ({newMushroom.stem_width} mm)</InputLabel>
                    <Slider
                        name="stem_width"
                        aria-labelledby="stem-width-slider-label"
                        value={newMushroom.stem_width || 0}
                        onChange={handleSliderChange('stem_width')}
                        step={0.1}
                        min={0.0}
                        max={125.0}
                        valueLabelDisplay="auto"
                    />
                </FormControl>

                <FormControl>
                    <InputLabel id="stem-root-label">Stem Root</InputLabel>
                    <Select
                        labelId="stem-root-label"
                        name="stem_root"
                        onChange={handleChange}
                        value={newMushroom.stem_root || ''}
                    >
                        {Object.entries(StemRootEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {StemRootEnumToString[value as StemRootEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="stem-surface-label">Stem Surface</InputLabel>
                    <Select
                        labelId="stem-surface-label"
                        name="stem_surface"
                        onChange={handleChange}
                        value={newMushroom.stem_surface || ''}
                    >
                        {Object.entries(CapSurfaceEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapSurfaceEnumToString[value as CapSurfaceEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="stem-color-label">Stem Color</InputLabel>
                    <Select
                        labelId="stem-color-label"
                        name="stem_color"
                        onChange={handleChange}
                        value={newMushroom.stem_color || ''}
                    >
                        {Object.entries(CapColorEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapColorEnumToString[value as CapColorEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="veil-type-label">Veil Type</InputLabel>
                    <Select
                        labelId="veil-type-label"
                        name="veil_type"
                        onChange={handleChange}
                        value={newMushroom.veil_type || ''}
                    >
                        {Object.entries(VeilTypeEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {VeilTypeEnumToString[value as VeilTypeEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="veil-color-label">Veil Color</InputLabel>
                    <Select
                        labelId="veil-color-label"
                        name="veil_color"
                        onChange={handleChange}
                        value={newMushroom.veil_color || ''}
                    >
                        {Object.entries(CapColorEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapColorEnumToString[value as CapColorEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="has-ring-label">Has Ring?</InputLabel>
                    <Select
                        labelId="has-ring-label"
                        name="has_ring"
                        onChange={handleChange}
                        value={newMushroom.has_ring || ''}
                    >
                        {Object.entries(HasRingEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {HasRingEnumToString[value as HasRingEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="ring-type-label">Ring Type</InputLabel>
                    <Select
                        labelId="ring-type-label"
                        name="ring_type"
                        onChange={handleChange}
                        value={newMushroom.ring_type || ''}
                    >
                        {Object.entries(RingTypeEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {RingTypeEnumToString[value as RingTypeEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="spore-print-color-label">Spore Print Color</InputLabel>
                    <Select
                        labelId="spore-print-color-label"
                        name="spore_print_color"
                        onChange={handleChange}
                        value={newMushroom.spore_print_color || ''}
                    >
                        {Object.entries(CapColorEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapColorEnumToString[value as CapColorEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="habitat-name-label">Habitat</InputLabel>
                    <Select
                        labelId="habitat-name-label"
                        name="habitat"
                        onChange={handleChange}
                        value={newMushroom.habitat || ''}
                    >
                        {Object.entries(HabitatEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {HabitatEnumToString[value as HabitatEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="season-label">Season</InputLabel>
                    <Select
                        labelId="season-label"
                        name="season"
                        onChange={handleChange}
                        value={newMushroom.season || ''}
                    >
                        {Object.entries(SeasonEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {SeasonEnumToString[value as SeasonEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box></Box>
                <Button type="submit" variant="contained" color="primary">
                    Add Mushroom
                </Button>
                <Box></Box>
            </Box>
        </>
    );
};

export default MushroomInsert;