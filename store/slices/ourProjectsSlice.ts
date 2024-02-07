import {StateCreator} from "zustand";
import {APIResponse} from "@/types/APIResponse";
import {api} from "@/api/api";
import {OurProject} from "@/types/dto/OurProject";

export type OurProjectsSlice = {
    addOurProject: (project: OurProject) => Promise<APIResponse | void>,
    deleteOurProject : (projectId : number) => Promise<APIResponse | void>,
    changeOurProjectOrder : (orderMap : Record<string, string>) => Promise<APIResponse | void>
}

export const ourProjectSlice: StateCreator<OurProjectsSlice, [], [], OurProjectsSlice> = (set) => ({

    addOurProject: async (project: OurProject) => {
        return api.post("/our-works/add-project", project)
    },

    deleteOurProject : async (projectId : number) => {
        return api.delete(`/our-works/${projectId}`)
    },

    changeOurProjectOrder : async (orderMap : Record<string, string>) => {
        return api.put("/our-works/change-order", orderMap)
    }

})