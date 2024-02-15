import {StateCreator} from "zustand";
import {api} from "@/api/api";

export type FileSlice = {
    files: any[],
    uploadImage: (file: File) => void,
    downloadImage: (imageUUID: string) => Promise<File>
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
            .then(async response => {

                const filename = imageUUID.slice(37)
                const base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
                const base64File = "data:image/png;base64," + base64ImageString

                const res = await fetch(base64File)
                const blob = await res.blob()

                return new File([blob], filename, {type: "image/png"})

            })
    }

})