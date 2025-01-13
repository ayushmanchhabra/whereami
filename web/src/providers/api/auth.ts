import { AxiosResponse } from "axios";

import { httpClient } from "providers/api";

async function signin(username: string, password: string): Promise<AxiosResponse> {
    const response = await httpClient.post('/api/v1/auth/signin', { username, password });
    return response;
}

export {
    signin,
};
