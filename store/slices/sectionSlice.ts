import {StateCreator} from "zustand";
import {Section} from "@/types/dto/Section";
import {api} from "@/api/api";
import {APIResponse} from "@/types/APIResponse";

export type SectionSlice = {
    sections : Section[],
    getSections : () => Promise<APIResponse | void>,
    addSection : (name : string) => Promise<APIResponse | void>,
    changeOrder : (orderMap : Record<string, string>) => Promise<APIResponse | void>
}

export const sectionSlice : StateCreator<SectionSlice, [] ,[], SectionSlice> = (set, get) => ({

    sections : [],

    getSections : async () => {
        return api.get('/section/get-all')
            .then((response) => {
                const data = response.data.payload
                set({sections : data})
            })
            .catch((error) => error as APIResponse)
            .finally(console.log)
    },

    addSection : async (name : string) => {
        return api.post("/section/create", {name : name})
            .then((response) => response.data as APIResponse)
            .catch((error) => error as APIResponse)
    },

    changeOrder : async (orderMap : Record<string, string>) => {
        return api.put("/section/change-order", {
            entityIdToNewOrderIdMap : orderMap
        })
            .then((response) => response.data as APIResponse)
            .catch((error) => error as APIResponse)
    }

})