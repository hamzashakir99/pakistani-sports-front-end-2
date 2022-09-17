import axios from "axios"
axios.defaults.baseURL = process.env.API_URL;
axios.defaults.validateStatus = (status)=>{
    return status < 500
};
export default axios