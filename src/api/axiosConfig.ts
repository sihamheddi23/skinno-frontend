import axios from "axios";

export const BASE_URL = "http://localhost:3000/api/v1";
export const axiosConfig = axios.create({
    baseURL: "http://localhost:3000/api/v1",
})


