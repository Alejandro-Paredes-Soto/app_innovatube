import axios from 'axios';


const URL_BASE = "https://service-innovatube.onrender.com/"

export const methodGet = async (url, token) => {
    try {
        const response = await axios.get(`${URL_BASE}${url}`, {
            headers: {
                Authorization: token
            }
        });
        return {
            status: response.status,
            json: response.data,
            message: 'Ok'
        };
    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message || error.message
            };
        } else {
            return {
                status: 500,
                message: error.message
            };
        }
    }
};

export const methodPost = async (url, data, token) => {
    try {
        const response = await axios.post(`${URL_BASE}${url}`, data, {
            headers: {
                Authorization: token
            }
        });
        return {
            status: response.status,
            json: response.data,
            message: 'Ok'
        };
    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message || error.message
            };
        } else {
            return {
                status: 500,
                message: error.message
            };
        }
    }
};
