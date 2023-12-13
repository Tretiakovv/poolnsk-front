import {useState} from "react";
import {Section} from "@/types/dto/Section";

export const useProductsPage = (sectionId : number, categoryId : number) => {

    const [
        products,
        setCategories
    ] = useState<Section[]>([])

    return {products}

}