import axios from "axios";

import { signin,signout } from './user';

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_API_PORT;

const httpClient = axios.create({
    baseURL: `${host}:${port}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export {
    httpClient,
    signin,
    signout,
};
