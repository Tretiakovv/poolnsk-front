import {useStore} from "@/store/store";
import {useQuery} from "react-query";
import {useShallow} from "zustand/react/shallow";
import {useProductPage} from "@/app/catalog/section/[sectionId]/category/[categoryId]/new/page.hooks";

export const useEditProductPage = (categoryId: number, productId: number) => {

    let createContext = {}

    const [product, getProduct] = useStore(
        useShallow(state => [state.product, state.getProduct])
    )

    const getProductQuery = useQuery({
        queryKey: ["get", "product", productId],
        queryFn: () => getProduct(productId),
        onSuccess: () => createContext = useProductPage(categoryId, product)
    })

    return {
        getProductQuery, product, createContext
    }

}