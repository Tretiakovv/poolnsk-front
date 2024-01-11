import {APIResponse} from "@/types/APIResponse";
import {StateCreator} from "zustand";
import {api} from "@/api/api";
import {Order, OrderStatus} from "@/types/dto/Order";
import {Request} from "@/types/dto/Request";
import {RequestType} from "@/types/dto/Request";

export type ControlPanelSlice = {

    requests : Request[],
    getRequests : (reqType : RequestType, processed : boolean | null) => Promise<APIResponse | void>,

    orders : Order[],
    getOrders : (status : OrderStatus, pageNumber : number, pageSize : number) => Promise<APIResponse | void>,

    changeOrderStatus : (orderId : number, status : OrderStatus) => Promise<APIResponse | void>,
    markRequestProcessed : (requestId : number) => Promise<APIResponse | void>,
    markRequestNotProcessed : (requestId : number) => Promise<APIResponse | void>

}

export const controlPanelSlice : StateCreator<ControlPanelSlice, [] ,[], ControlPanelSlice> = (set) => ({

    requests : [],
    orders : [],

    getRequests : async (reqType : RequestType, processed : boolean | null) => {

        const queryParams = {
            type : reqType,
            processed : processed,
            pageNumber : 0, pageSize : 10
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
    },

    changeOrderStatus : async (orderId : number, status : OrderStatus) => {
        return api.put("/order/change-status", {
            orderId : orderId, status : status
        })
            .then((response) => response.data as APIResponse)
            .catch((exception) => exception as APIResponse)
    },

    markRequestProcessed : async (requestId : number) => {
        return api.put(`/application/mark-application-processed/${requestId}`)
            .then((response) => response.data as APIResponse)
            .catch((exception) => exception as APIResponse)
    },

    markRequestNotProcessed : async (requestId : number) => {
        return api.put(`/application/mark-application-not-processed/${requestId}`)
            .then((response) => response.data as APIResponse)
            .catch((exception) => exception as APIResponse)
    }

})