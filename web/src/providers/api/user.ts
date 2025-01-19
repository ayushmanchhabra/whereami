import { AxiosResponse } from "axios";

import { httpClient } from "providers/api";

async function signin(username: string, password: string): Promise<AxiosResponse> {
    const response = await httpClient.post('/api/v1/user/signin', { username, password }, {
        withCredentials: true,
    });
    return response;
}

async function signout(): Promise<AxiosResponse> {
    const response = await httpClient.post('/api/v1/user/signout', {}, {
        withCredentials: true,
    });
    return response;
}

async function info(): Promise<AxiosResponse> {
    const response = await httpClient.get('/api/v1/user/info', {
        withCredentials: true,
        headers: {
            'Authorization': document.cookie.split('=')[1],
        },
    });
    return response;
}

export {
    signin,
    signout,
    info,
};
