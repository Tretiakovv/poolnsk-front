import {Worker} from "@/types/dto/Worker";
import {APIResponse} from "@/types/APIResponse";
import {StateCreator} from "zustand";
import {api} from "@/api/api";

export type WorkersSlice = {
    workers : Worker[],
    getWorkers : () => Promise<APIResponse | void>
}

export const workersSlice : StateCreator<WorkersSlice, [] ,[], WorkersSlice> = (set) => ({

    workers : [],

    getWorkers : async () => {
        return api.get('/get-workers')
            .then((response) => {
                const data = response.data.payload
                set({workers : data})
            })
            .catch((error) => error as APIResponse)
            .finally(console.log)
    },

})