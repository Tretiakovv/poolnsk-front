import {StateCreator} from "zustand";
import {APIResponse} from "@/types/APIResponse";
import {api} from "@/api/api";
import {OurProject} from "@/types/dto/OurProject";

export type OurProjectsSlice = {
    addOurProject: (project: OurProject) => Promise<APIResponse | void>
}

export const ourProjectSlice: StateCreator<OurProjectsSlice, [], [], OurProjectsSlice> = (set) => ({

    addOurProject: async (project: OurProject) => {
        return api.post("/our-works/add-project", project)
    }

})