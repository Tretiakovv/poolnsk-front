import {Option} from "@/types/Option";

export type OurProjectChar = {
    fileName : string,
    name : string,
    info : string
}

export type OurProjectCharView = {
    icon : Option
} & Omit<OurProjectChar, "fileName">