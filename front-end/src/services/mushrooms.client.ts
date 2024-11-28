import axios from 'axios';
import {MushroomDTO} from "../types/mushroom";


const fetchMushrooms = async (queryParams: Partial<MushroomDTO>) => {
    return await axios.get('http://localhost:8000/api/mushrooms/', {
        params: queryParams,
    });
};

const insertMushroom = async (mushroom: MushroomDTO, token: string) => {
    return await axios.post('http://localhost:8000/api/mushrooms/', mushroom, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    fetchMushrooms,
    insertMushroom,
};