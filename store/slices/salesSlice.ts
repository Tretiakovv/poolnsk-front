import {StateCreator} from "zustand";
import {APIResponse} from "@/types/APIResponse";
import {api} from "@/api/api";
import {Promotion, ReqImagePromotion, ReqProductPromotion} from "@/types/dto/Promotion";

export type PromotionsSlice = {

    promotions : Promotion[],

    getPromotions : () => Promise<APIResponse | void>,
    addImagePromotion : (promo : ReqImagePromotion) => Promise<APIResponse | void>,
    addProductPromotion : (promo : ReqProductPromotion) => Promise<APIResponse | void>,
    deletePromotion : (promoId : number) => Promise<APIResponse | void>,
    changePromoOrder : (orderMap : Record<string, string>) => Promise<APIResponse | void>,
    uploadImage : (file : File) => Promise<string>

}

export const promotionsSlice : StateCreator<PromotionsSlice, [], [], PromotionsSlice> = (set) => ({

    promotions : [],

    getPromotions : async () => {
        return api.get("/promotion/get-all")
            .then((response) => {
                set({promotions : response.data.payload})
            })
            .catch((error) => error as APIResponse)
    },

    addImagePromotion : async (promo : ReqImagePromotion) => {
        return api.post("/promotion/create-by-image-template", promo)
    },

    addProductPromotion : async (promo : ReqProductPromotion) => {
        return api.post("/promotion/create-by-existing-product", promo)
    },

    deletePromotion : async (promoId : number) => {
        return api.delete(`/promotion/${promoId}`)
    },

    changePromoOrder : async (orderMap : Record<string, string>) => {
        return api.put("/promotion/change-order", {
            entityIdToNewOrderIdMap : orderMap
        })
    },

    uploadImage : async (file : File) => {
        const formData = new FormData()
        formData.append('file', file)
        return api.post("/file/upload-image", formData)
            .then(response => response.data.payload)
    }

})