export const SET_TOKEN = (token) => {
    localStorage.setItem('TOKEN', token);
}

export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN');
}

export const CLEAR_TOKEN = () => {
    localStorage.removeItem('TOKEN');
}