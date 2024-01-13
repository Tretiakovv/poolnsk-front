import {APIResponse} from "@/types/APIResponse";
import {StateCreator} from "zustand";
import {api} from "@/api/api";
import {ResponseChar} from "@/types/ResponseChar";
import {ProductShort} from "@/types/dto/Product";

export type ProductSlice = {

    products : ProductShort[],
    characteristics : ResponseChar[],
    photoNames : string[],

    getCharacteristics : (categoryId : number) => Promise<APIResponse | void>,
    addPhoto : (photo : File) => Promise<APIResponse | void>,
    addProduct : (data : any) => Promise<APIResponse | void>,
    getProducts : (categoryId : number) => Promise<APIResponse | void>,
    deleteProduct : (productId : number) => Promise<APIResponse | void>,

    changeProductOrder : (orderMap : Record<string, string>) => Promise<APIResponse | void>

}

export const productSlice : StateCreator<ProductSlice, [], [], ProductSlice> = (set, get) => ({

    products : [],
    characteristics : [],
    photoNames : [],

    getCharacteristics : async (categoryId : number) => {
        return api.get(`/property/get-by-category/${categoryId}`)
            .then((response) => {
                set({characteristics : response.data.payload})
                return response.data as APIResponse
            })
            .then((exception) => exception as APIResponse)
    },

    addPhoto : async (photo : File) => {

        const formData = new FormData()
        formData.append("file", photo)

        return api.post("/file/upload-image", formData, {
            headers : {"Content-type": "multipart/form-data"}
        })
            .then((response) => {
                set((state) => ({
                    photoNames : [...state.photoNames, response.data.payload]
                }))
                return response.data as APIResponse
            })
            .catch((exceptions) => exceptions as APIResponse)
    },

    addProduct : async (data : any) => {
        return api.post("/product/create", data)
    },

    getProducts : async (categoryId : number) => {
        return api.get(`/product/get-product-by-category/${categoryId}`)
            .then((response) => {
                set({products : response.data.payload})
                return response.data as APIResponse
            })
            .catch((exception) => exception as APIResponse)
    },

    changeProductOrder : async (orderMap : Record<string, string>) => {
        return api.put("/product/change-order", {
            entityIdToNewOrderIdMap : orderMap
        })
            .then((response) => response.data as APIResponse)
            .catch((error) => error as APIResponse)
    },

    deleteProduct : async (productId : number) => {
        return api.delete(`/product/${productId}`)
            .then(response => response.data as APIResponse)
            .catch(error => error as APIResponse)
    }

})