//intercepter will intercept any request that we sent and it will automatically add correct headers
import axios from"axios";
import { ACCESS_TOKEN } from "./constants";
//this enables to import anything specified inside a environment variable file
const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; //passing JWT acces token
        }  
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
export default api; //exporting object
