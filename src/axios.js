import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://13.55.198.210:8080'
});

export default instance;