import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;


const login = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/sessions/api-token`, { email, password });
};

export default {
  login,
};