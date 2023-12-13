import {StateCreator} from "zustand";
import {Section} from "@/types/dto/Section";
import {api} from "@/api/api";
import {APIResponse} from "@/types/APIResponse";

export type SectionSlice = {
    sections : Section[],
    getSections : () => Promise<APIResponse | void>
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

})