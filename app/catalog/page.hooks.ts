import {Section} from "@/types/Section";
import {useState} from "react";

export const useCatalogSectionsPage = () => {

    const [
        sections,
        setSections
    ] = useState<Section[]>([])

    return {
        sections
    }

}