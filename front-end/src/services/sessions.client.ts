import axios from 'axios';

const login = async (username: string, password: string) => {
  return await axios.post('/api/sessions', { username, password });
};

export default {
  login,
};