import {StateCreator} from "zustand";
import {Category} from "@/types/dto/Category";
import {api} from "@/api/api";
import {APIResponse} from "@/types/APIResponse";

export type CategorySlice = {

    category : Category | undefined,
    categories: Category[],

    getCategories: (sectionId: number) => Promise<APIResponse | void>,
    getCategory: (categoryId: number) => Promise<APIResponse | void>

}

export const categorySlice: StateCreator<CategorySlice, [], [], CategorySlice> = (set, get) => ({

    category : undefined,
    categories: [],

    getCategories: async (sectionId: number) => {
        return api.get(`category/view-by-section/${sectionId}`)
            .then((response) => {
                set({categories: response.data.payload})
            })
            .catch((error) => error as APIResponse)
    },

    getCategory: async (categoryId: number) => {
        return api.get(`/api/category/${categoryId}`)
            .then((response) => {
                set({category : response.data.payload})
            })
            .catch((error) => error as APIResponse)
    }

})