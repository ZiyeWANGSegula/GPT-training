// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

export const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    // const decoded = jwtDecode(accessToken);

    // const currentTime = Date.now() / 1000;

    return true;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        alert('Token expired');

        localStorage.removeItem('accessToken');

        window.location.href = PATH_AUTH.login;
    }, timeLeft);
};


export const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // This function below will handle when token is expired
        // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
        // tokenExpired(exp);
    } else {
        localStorage.removeItem('accessToken');

        delete axios.defaults.headers.common.Authorization;
    }
}