import { AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT } from 'admin-on-rest';
import { API_ENTRYPOINT, LOCAL_STORAGE_KEY_TOKEN } from './constants';

export default (type, params) => {
    switch (type) {
        case AUTH_ERROR:
            if (401 === params.status) {
                window.localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
                window.location.reload();
            }

            return Promise.resolve();

        case AUTH_LOGIN:
            const request = new Request(`${API_ENTRYPOINT}/login`, {
                body: JSON.stringify({
                    username: params.username,
                    password: params.password,
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                method: 'POST',
            });

            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }

                    return response.json();
                })
                .then(({ token }) => {
                    window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
                    window.location.replace('/');
                });

        case AUTH_LOGOUT:
            window.localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
            window.location.reload();

            return Promise.resolve();

        default:
            return Promise.resolve();
    }
};
