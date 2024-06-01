import axios from 'axios';

export const methodGet = async (url, token) => {
    try {
        const response = await axios.get(url, {
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
        const response = await axios.post(url, data, {
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
