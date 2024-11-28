import axios from 'axios';

const login = async (email: string, password: string) => {
  return await axios.post('http://localhost:8000/api/sessions/api-token', { email, password });
};

export default {
  login,
};