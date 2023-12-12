import axios from "axios";

export const api = axios.create({
    baseURL : "http://82.146.43.76/api/"
})