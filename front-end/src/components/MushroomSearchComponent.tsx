import React, {FormEvent, ReactNode, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from '@mui/material';
import {fetchMushrooms} from '../redux/slices/mushroomSliceReducer';
import {AppDispatch, RootState} from '../redux/storeInitializer';
import {
    CapColorEnum,
    CapColorEnumToString,
    CapShapeEnum,
    CapShapeEnumToString,
    CapSurfaceEnum,
    CapSurfaceEnumToString,
    ClassEnum, GillAttachmentEnum, GillAttachmentEnumToString,
    HabitatEnum,
    HabitatEnumToString,
    Mushroom,
    MushroomDTO,
    SeasonEnum,
    SeasonEnumToString, VeilTypeEnum, VeilTypeEnumToString
} from '../types/mushroom';
import {ZebraTableRow} from "./styles/ZebraTable";
import MenuBar from "./MenuBar";

const MushroomSearch: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const mushrooms = useSelector((state: RootState) => state.mushroom.mushrooms);
    const [queryParams, setQueryParams] = useState<Partial<MushroomDTO>>({});

    useEffect(() => {
        dispatch(fetchMushrooms(queryParams));
    }, [dispatch]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        dispatch(fetchMushrooms(queryParams));
    };

    const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
        const {name, value} = e.target;
        setQueryParams({...queryParams, [name as string]: value as string});
    };

    const createClassStyle = (cls: ClassEnum) => {
        return cls == ClassEnum.edible ? {color: 'green'} : {color: 'red'};
    }

    return (
        <>
            <MenuBar/>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Mushroom Search
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{mb: 4, color: 'text.secondary'}}>
                Search for mushrooms by filtering their main attributes. Search results are capped at 100 results.
                Narrow your search by selecting the desired attributes.
            </Typography>
            <Box>
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2,
                        marginBottom: 2,
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
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={ClassEnum.poisonous}>Poisonous</MenuItem>
                            <MenuItem value={ClassEnum.edible}>Edible</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="cap-shape-label">Cap Shape</InputLabel>
                        <Select
                            labelId="cap-shape-label"
                            name="cap_shape"
                            label="Cap Shape"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(CapShapeEnum).map(([key, value]) => (
                                <MenuItem key={key}
                                          value={value}>{CapShapeEnumToString[value as CapShapeEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="cap-surface-label">Cap Surface</InputLabel>
                        <Select
                            labelId="cap-surface-label"
                            name="cap_surface"
                            label="Cap Surface"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(CapSurfaceEnum).map(([key, value]) => (
                                <MenuItem key={key}
                                          value={value}>{CapSurfaceEnumToString[value as CapSurfaceEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="cap-color-label">Cap Color</InputLabel>
                        <Select
                            labelId="cap-color-label"
                            name="cap_color"
                            label="Cap Color"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(CapColorEnum).map(([key, value]) => (
                                <MenuItem key={key}
                                          value={value}>{CapColorEnumToString[value as CapColorEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="habitat-label">Habitat</InputLabel>
                        <Select
                            labelId="habitat-label"
                            name="habitat"
                            label="Habitat"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(HabitatEnum).map(([key, value]) => (
                                <MenuItem key={key} value={value}>{HabitatEnumToString[value as HabitatEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="veil-label">Veil</InputLabel>
                        <Select
                            labelId="veil-label"
                            name="veil"
                            label="Veil"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(VeilTypeEnum).map(([key, value]) => (
                                <MenuItem key={key}
                                          value={value}>{VeilTypeEnumToString[value as VeilTypeEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="gill-label">Gill Attachment</InputLabel>
                        <Select
                            labelId="gill-label"
                            name="gill"
                            label="Gill Attachment"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(GillAttachmentEnum).map(([key, value]) => (
                                <MenuItem key={key}
                                          value={value}>{GillAttachmentEnumToString[value as GillAttachmentEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="season-label">Season</InputLabel>
                        <Select
                            labelId="season-label"
                            name="season"
                            label="Season"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {Object.entries(SeasonEnum).map(([key, value]) => (
                                <MenuItem key={key} value={value}>{SeasonEnumToString[value as SeasonEnum]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="success">
                        Search
                    </Button>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'right', marginBottom: 2}}>
                    Mushroom(s) found: {mushrooms?.data?.length}
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Bruise or Bleeds?</TableCell>
                                <TableCell>Cap Diameter (cm)</TableCell>
                                <TableCell>Cap Shape</TableCell>
                                <TableCell>Cap Color</TableCell>
                                <TableCell>Stem Height (cm)</TableCell>
                                <TableCell>Stem Width (mm)</TableCell>
                                <TableCell>Stem Color</TableCell>
                                <TableCell>Stem Root</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mushrooms.data.map((mushroom) => new Mushroom(mushroom)).map((mushroom) => (
                                <ZebraTableRow key={mushroom.id}>
                                    <TableCell>{mushroom.id}</TableCell>
                                    <TableCell
                                        style={createClassStyle(mushroom.mushroom_class!)}>{mushroom.class}</TableCell>
                                    <TableCell>{mushroom.doesBruiseBleed}</TableCell>
                                    <TableCell>{mushroom.cap_diameter}</TableCell>
                                    <TableCell>{mushroom.capShape}</TableCell>
                                    <TableCell>{mushroom.capColor}</TableCell>
                                    <TableCell>{mushroom.stem_height}</TableCell>
                                    <TableCell>{mushroom.stem_width}</TableCell>
                                    <TableCell>{mushroom.stemColor}</TableCell>
                                    <TableCell>{mushroom.stemRoot}</TableCell>
                                </ZebraTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default MushroomSearch;