import {StateCreator} from "zustand";
import {Category} from "@/types/dto/Category";
import {api} from "@/api/api";
import {APIResponse} from "@/types/APIResponse";
import {Characteristic} from "@/types/Characteristic";

export type CategorySlice = {

    category : Category | undefined,
    categories: Category[],

    getCategories: (sectionId: number) => Promise<APIResponse | void>,
    getCategory: (categoryId: number) => Promise<APIResponse | void>,
    addCategory : (sectionId : number, name : string, propertyList : Characteristic[]) => Promise<APIResponse | void>,
    deleteCategory : (categoryId : number) => Promise<APIResponse | void>,

    changeCategoryOrder : (orderMap : Record<string, string>) => Promise<APIResponse | void>

}

export const categorySlice: StateCreator<CategorySlice, [], [], CategorySlice> = (set) => ({

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
    },

    addCategory : async (sectionId : number, name : string, propertyList : Characteristic[]) => {
        return api.post("/category/create", {
            sectionId : sectionId,
            name : name,
            propertyList : propertyList
        })
    },

    changeCategoryOrder : async (orderMap : Record<string, string>) => {
        return api.put("/category/change-order", {
            entityIdToNewOrderIdMap : orderMap
        })
            .then((response) => response.data as APIResponse)
            .catch((error) => error as APIResponse)
    },

    deleteCategory : async (categoryId : number) => {
        return api.delete(`/category/${categoryId}`)
    }

})