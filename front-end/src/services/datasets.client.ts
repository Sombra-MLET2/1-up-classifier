import axios from 'axios';


const importDataset = async (token: string) => {
    return await axios.post('http://localhost:8000/api/datasets/import', null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const deleteDataset = async (token: string) => {
    return await axios.delete('http://localhost:8000/api/datasets/import', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {
    importDataset,
    deleteDataset,
};