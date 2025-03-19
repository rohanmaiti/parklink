import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:4000/api",
    // baseURL : "http://192.168.217.49:4000/api",
    // baseURL : " https://d1d0-152-59-85-173.ngrok-free.app", 
    withCredentials:true
})