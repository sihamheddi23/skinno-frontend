import axios from "axios";

export const BASE_URL = "https://skin-care-rest-api.onrender.com/api/v1";
export const axiosConfig = axios.create({
    baseURL: "https://skin-care-rest-api.onrender.com",
})


