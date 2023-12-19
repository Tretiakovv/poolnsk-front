import {APIResponse} from "@/types/APIResponse";
import {StateCreator} from "zustand";
import {api} from "@/api/api";
import {Order, OrderStatus} from "@/types/dto/Order";
import {Request} from "@/types/dto/Request";
import {RequestType} from "@/types/dto/Request";

export type ControlPanelSlice = {

    requests : Request[],
    getRequests : (reqType : RequestType, isProcessed : boolean) => Promise<APIResponse | void>,

    orders : Order[],
    getOrders : (orderType : OrderStatus, pageNumber : number, pageSize : number) => Promise<APIResponse | void>

}

export const controlPanelSlice : StateCreator<ControlPanelSlice, [] ,[], ControlPanelSlice> = (set) => ({

    requests : [],
    orders : [],

    getRequests : async (reqType : RequestType, isProcessed : boolean) => {

        const queryParams = {
                type : reqType,
            processed : isProcessed,
            start : 0, end : 0
        }

        return api.get("/application", {params : queryParams})
            .then((response) => {
                set({requests : response.data.payload})
            })
            .catch((error) => error as APIResponse)
    },

    getOrders : async (orderType : OrderStatus, pageNumber : number, pageSize : number) => {

        const queryParams = {
            type : orderType,
            pageNumber : pageNumber,
            pageSize : pageSize
        }

        return api.get('order', {params : queryParams})
            .then((response) => {
                set({orders : response.data.payload})
            })
            .catch((exception) => exception as APIResponse)
    }

})