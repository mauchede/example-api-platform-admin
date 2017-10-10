const normalizeUrl = url => ('/' === url.slice(-1) ? url.substring(0, url.length - 1) : url);

export const API_ENTRYPOINT = normalizeUrl(process.env.REACT_APP_API_ENTRYPOINT);

export const LOCAL_STORAGE_KEY_TOKEN = 'token';
