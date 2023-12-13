import {StateCreator} from "zustand";
import {APIResponse} from "@/types/APIResponse";
import {api} from "@/api/api";
import {Promotion} from "@/types/Promotion";

export type PromotionsSlice = {
    promotions : Promotion[],
    getPromotions : () => Promise<APIResponse | void>
}

export const promotionsSlice : StateCreator<PromotionsSlice, [], [], PromotionsSlice> = (set, get) => ({

    promotions : [],

    getPromotions : async () => {
        return api.get("/promotion/get-all")
            .then((response) => {
                set({promotions : response.data.payload})
            })
            .catch((error) => error as APIResponse)
    }

})