import axios from "axios";

const Api = axios.create({
    baseURL: "https://YOUR-BACKEND-URL.onrender.com/api/v1"
});

export default Api;