import {useState} from "react";
import {ProductShort} from "@/types/dto/Product";
import {prepareSortableItems} from "@/utils/prepareSortableItems";
import {products} from "@/mock/catalogData";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";

export const useCatalogProductsPage = (sectionId : number, categoryId : number) => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const [
        sortableItems,
        setSortableItems
    ] = useState<ProductShort[]>(prepareSortableItems(products) as ProductShort[])

    const handleEditClick = (itemId : number) => console.log("EDIT CLICK")
    const handleDeleteClick = (itemId : number) => console.log("EDIT CLICK")
    const handleAddProduct = () => router.push(pathName.concat("/new"))

    return {
        sortableItems, handleEditClick,
        handleDeleteClick, handleAddProduct
    }

}