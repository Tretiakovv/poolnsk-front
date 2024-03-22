import {StateCreator} from "zustand";
import {api} from "@/api/api";

export type AuthSlice = {
    auth : (username : string, password : string) => void,
    refresh : () => void
}

export const authStore : StateCreator<AuthSlice, [], [], AuthSlice> = () => ({

    auth : async (username : string, password : string) => {
        return api.post("/auth", {username, password})
            .then(response => localStorage.setItem("ACCESS_TOKEN", response.data.payload.access_token))
            .catch(console.log)
    },

    refresh : async () => {
        return api.post("/refresh-auth-token")
            .then(response => localStorage.setItem("ACCESS_TOKEN", response.data.payload.access_token))
            .catch(console.log)
    }

})