import axios from 'axios';

const API = axios.create({
    baseURL: 'https://192.168.176.167:3000/api/v1',
});

export default API;