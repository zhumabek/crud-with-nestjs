import axios from 'axios';
import constants from './constants';

const instance = axios.create({
    baseURL: constants.apiURL
});

instance.interceptors.response.use(
    (response) => { return response.data },
    (error) => {
        // if(error.response && error.response.data.message){
        //     showError(error.response.data.message);
        // }
        return Promise.reject(error);
    });


export default instance;