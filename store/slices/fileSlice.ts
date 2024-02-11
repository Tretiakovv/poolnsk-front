import {StateCreator} from "zustand";
import {api} from "@/api/api";

export type FileSlice = {
    files: any[],
    uploadImage: (file: File) => void,
    downloadImage: (imageUUID: string) => void
}

export const fileSlice: StateCreator<FileSlice, [], [], FileSlice> = (set) => ({

    files: [],

    uploadImage: async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return api.post("/file/upload-image", formData)
            .then(response => response.data.payload)
    },

    downloadImage: async (imageUUID: string) => {
        return api.get(`/file/get-image?filename=${imageUUID}`)
            .then(response => set(
                    state => (
                        {files: [...state.files, response.data.payload]}
                    )
                )
            )
    }

})