import {Project} from "@/types/dto/Project";
import {APIResponse} from "@/types/APIResponse";
import {StateCreator} from "zustand";
import {api} from "@/api/api";

export type ProjectsSlice = {
    projects : Project[],
    getProjects : () => Promise<APIResponse | void>
}

export const projectsSlice : StateCreator<ProjectsSlice, [], [], ProjectsSlice> = (set) => ({

    projects : [],

    getProjects : async () => {
        return api.get('/our-works')
            .then((response) => {
                set({projects : response.data.payload})
            })
            .catch((error) => error as APIResponse)
    }

})