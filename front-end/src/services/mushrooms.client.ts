import axios from 'axios';
import {MushroomDTO} from "../types/mushroom";


const API_URL = process.env.REACT_APP_API_URL;


const fetchMushrooms = async (queryParams: Partial<MushroomDTO>) => {
    return await axios.get(`${API_URL}/mushrooms/`, {
        params: queryParams,
    });
};

const insertMushroom = async (mushroom: MushroomDTO, token: string) => {
    return await axios.post(`${API_URL}/mushrooms/`, mushroom, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    fetchMushrooms,
    insertMushroom,
};