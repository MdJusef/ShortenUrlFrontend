import axios from 'axios';

const baseURL = axios.create({

    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default baseURL;