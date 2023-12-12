import {Section} from "@/types/Section";
import {useState} from "react";

export const useCategoriesPage = (sectionId : number) => {

    const [
        categories,
        setCategories
    ] = useState<Section[]>([])

    return {categories}

}