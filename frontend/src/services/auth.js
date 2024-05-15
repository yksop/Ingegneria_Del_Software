// if there is a token, return , otherwise return null
export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    // check if there is the token in the local storage
    return getToken() !== null;
};

export const isVol = () => {
    return false;
}

export const isAmm = () => {
    return false;
}

export const is118 = () => {
    return false;
}