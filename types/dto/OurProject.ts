import {OurProjectChar} from "@/types/dto/OurProjectChar";

export type OurProject = {
    name: string,
    workType: string,
    terms: string,
    imageFilenameList: string[],
    projectPropertyDtoList : OurProjectChar[]
}