import { fetchHydra, hydraClient } from '@api-platform/admin';
import { LOCAL_STORAGE_KEY_TOKEN } from './constants';

export const headers = {
    Authorization: `Bearer ${window.localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)}`,
};

export default api =>
    hydraClient(api, (url, options = {}) =>
        fetchHydra(url, {
            ...options,
            headers: new Headers(headers),
        }),
    );
