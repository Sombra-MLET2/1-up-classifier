import React, {FormEvent, ReactNode, useState} from 'react';
import MenuBar from "./MenuBar";
import {
    Alert, AlertTitle,
    Box, Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Typography
} from "@mui/material";
import {
    CapColorEnum,
    CapColorEnumToString,
    CapShapeEnum,
    CapShapeEnumToString,
    CapSurfaceEnum,
    CapSurfaceEnumToString,
    DoesBruiseBleedEnum,
    DoesBruiseBleedEnumToString,
    GillAttachmentEnum,
    GillAttachmentEnumToString,
    GillSpacingEnum,
    GillSpacingEnumToString, HabitatEnum, HabitatEnumToString,
    HasRingEnum,
    HasRingEnumToString,
    MushroomDTO, MushroomPredictionDTO,
    RingTypeEnum,
    RingTypeEnumToString, SeasonEnum, SeasonEnumToString,
    StemRootEnum,
    StemRootEnumToString,
    VeilTypeEnum,
    VeilTypeEnumToString
} from "../types/mushroom";
import {predictMushroom} from "../redux/slices/mushroomSliceReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/storeInitializer";


const MushroomPredict: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [prediction, setPrediction] = useState<MushroomPredictionDTO | null>(null);
    const [predictionError, setPredictionError] = useState<boolean>(false);
    const [mushroom, setMushroom] = useState<Partial<MushroomDTO>>({
        cap_diameter: 0,
        stem_height: 0,
        stem_width: 0,
    });

    const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
        const {name, value} = e.target;
        setMushroom(prevState => ({...prevState, [name as string]: value}));
    };

    const handleSliderChange = (name: string) => (event: Event, value: number | number[]) => {
        setMushroom({...mushroom, [name]: value as number});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await dispatch(predictMushroom(mushroom as MushroomDTO));

            if (predictMushroom.fulfilled.match(response)) {
                setPrediction(response.payload)
                setPredictionError(false);
            } else {
                console.error("Prediction failed.");
                setPredictionError(true);
            }

        } catch (err) {
            setPredictionError(true);
            console.error("Prediction request failed: ", err);
        } finally {
            setTimeout(() =>{
                setPrediction(null);
                setPredictionError(false);
            }, 3500);
        }
    }


    return (
        <>
            <MenuBar/>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Mushroom Safety Prediction
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                textAlign: 'center',
                justifyContent: 'center'
            }} id="mushroom-prediction">
                {prediction && !predictionError && (
                    prediction.edible ? (
                        <Alert icon="😋" severity='success'>
                            <AlertTitle style={{fontWeight: 'bold'}}>Mushroom is edible</AlertTitle>
                            This mushroom is safe for consumption. <br/>
                            However, if you experience any unusual symptoms after consuming, please seek medical
                            attention promptly.
                        </Alert>
                    ) : (
                        <Alert icon="☠️" severity='error'>
                            <AlertTitle style={{fontWeight: 'bold'}}>Mushroom is poisonous</AlertTitle>
                            <span style={{fontWeight: 'bolder'}}>Avoid consumption at all costs.</span><br/>
                            If ingested, watch for symptoms and contact a healthcare
                            provider immediately.
                        </Alert>
                    )
                )}
                {predictionError && (
                    <Alert icon="❓" severity='warning'>
                        <AlertTitle style={{fontWeight: 'bold'}}>Prediction Failed</AlertTitle>
                        <span style={{fontWeight: 'bolder'}}>Avoid consumption at all costs.</span><br/>
                        Our prediction service is currently unavailable. Please, try again later.
                    </Alert>
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

                <FormControl sx={{m: 1}}>
                    <InputLabel id="cap-diameter-slider-label">Cap Diameter ({mushroom.cap_diameter} cm)</InputLabel>
                    <Slider
                        name="cap_diameter"
                        aria-labelledby="cap-diameter-slider-label"
                        value={mushroom.cap_diameter || 0}
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
                        value={mushroom.cap_shape || ''}
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
                        value={mushroom.cap_surface || ''}
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
                        value={mushroom.cap_color || ''}
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
                        value={mushroom.does_bruise_bleed || ''}
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
                        value={mushroom.gill_attachment || ''}
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
                        value={mushroom.gill_spacing || ''}
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
                        value={mushroom.gill_color || ''}
                    >
                        {Object.entries(CapColorEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {CapColorEnumToString[value as CapColorEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{m: 1}}>
                    <InputLabel id="stem-height-slider-label">Stem Height ({mushroom.stem_height} cm)</InputLabel>
                    <Slider
                        name="stem_height"
                        aria-labelledby="stem-height-slider-label"
                        value={mushroom.stem_height || 0}
                        onChange={handleSliderChange('stem_height')}
                        step={0.1}
                        min={0.0}
                        max={125.0}
                        valueLabelDisplay="auto"
                    />
                </FormControl>

                <FormControl sx={{m: 1}}>
                    <InputLabel id="stem-width-slider-label">Stem Width ({mushroom.stem_width} mm)</InputLabel>
                    <Slider
                        name="stem_width"
                        aria-labelledby="stem-width-slider-label"
                        value={mushroom.stem_width || 0}
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
                        value={mushroom.stem_root || ''}
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
                        value={mushroom.stem_surface || ''}
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
                        value={mushroom.stem_color || ''}
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
                        value={mushroom.veil_type || ''}
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
                        value={mushroom.veil_color || ''}
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
                        value={mushroom.has_ring || ''}
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
                        value={mushroom.ring_type || ''}
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
                        value={mushroom.spore_print_color || ''}
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
                        value={mushroom.habitat || ''}
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
                        value={mushroom.season || ''}
                    >
                        {Object.entries(SeasonEnum).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {SeasonEnumToString[value as SeasonEnum]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Predict Mushroom
                </Button>
                <Box></Box>
            </Box>
        </>
    );
}

export default MushroomPredict;