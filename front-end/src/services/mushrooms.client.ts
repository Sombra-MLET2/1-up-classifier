import axios from 'axios';
import {MushroomDTO} from "../types/mushroom";


const fetchMushrooms = async (queryParams: Partial<MushroomDTO>) => {
  return await axios.get('http://localhost:8000/api/mushrooms/', {
    params: queryParams,
  });
};

const insertMushroom = async (mushroom: MushroomDTO) => {
  return await axios.post('/mushrooms', mushroom);
};

export default {
  fetchMushrooms,
  insertMushroom,
};