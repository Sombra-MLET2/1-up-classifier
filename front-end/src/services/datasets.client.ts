import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;


const importDataset = async (token: string) => {
    return await axios.post(`${API_URL}/datasets/import`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const deleteDataset = async (token: string) => {
    return await axios.delete(`${API_URL}/datasets/import`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    importDataset,
    deleteDataset,
};