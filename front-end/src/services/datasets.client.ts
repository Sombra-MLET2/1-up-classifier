import axios from 'axios';


const importDataset = async () => {
    return await axios.post('http://localhost:8000/api/datasets/import');
};

const deleteDataset = async () => {
    return await axios.delete('http://localhost:8000/api/datasets/import');
};

export default {
    importDataset,
    deleteDataset,
};