import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': "application/json"
    }
});

// 🔹 Attach Authorization Token Before Every Request
axiosInstance.interceptors.request.use(
    function (config) {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = token;  // Ensure token is set
        }

        if (config.TYPE?.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE?.query) {
            config.url = `${config.url}/${config.TYPE.query}`;
        }
        
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 🔹 Handle API Responses
axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

// 🔹 Process API Responses
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.statusText || 'Unexpected Error',
            code: response?.status
        };
    }
};

// 🔹 Handle API Errors
const processError = (error) => {
    if (error.response) {
        console.error('🚨 API RESPONSE ERROR:', error.response);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        console.error('❌ API REQUEST ERROR:', error.request);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        console.error('⚠️ NETWORK ERROR:', error.message);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure,
            code: ""
        };
    }
};

// 🔹 Define API Functions Dynamically
const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = async (body, showUploadProgress, showDownloadProgress) => {
        try {
            const response = await axiosInstance({
                method: value.method,
                url: value.url,
                data: value.method ==='DELETE' ? {} : body,
                responseType: value.responseType,
                headers: {
                    Authorization: getAccessToken()
                },
                TYPE: getType(value, body),

                onUploadProgress: (progressEvent) => {
                    if (showUploadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showUploadProgress(percentageCompleted);
                    }
                },
                onDownloadProgress: (progressEvent) => {
                    if (showDownloadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showDownloadProgress(percentageCompleted);
                    }
                }
            });
            return response;
        } catch (error) {
            console.error(`🚨 API Call Failed: ${key}`, error);
            return processError(error);
        }
    };
}

export { API };
