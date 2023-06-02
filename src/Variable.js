const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const API_URL = process.env.REACT_APP_API_BASE_URL;
const PHOTO_URL = process.env.REACT_APP_PHOTO_BASE_URL;

export const variables = {
    API_URL: API_URL,
    PHOTO_URL: PHOTO_URL,
    EVENT_URL: `${API_URL}/Event`,
    USER_URL: `${API_URL}/User`,
    APP_USER_URL: `${API_URL}/AppUser`,
}