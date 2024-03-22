import axios from "axios";

const BASE_URL = "https://poolnsk.ru/api"

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
    const access_token = localStorage.getItem("ACCESS_TOKEN")
    if (access_token) config.headers.Authorization = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    return config
})

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 400 && !originalRequest._retry) {
        originalRequest._retry = true
        const response = await axios.post(
            `${BASE_URL}/refresh-auth-token`,
            null, {withCredentials: true})
        localStorage.setItem("ACCESS_TOKEN", response.data.payload.access_token)
        return api(originalRequest)
    }
})