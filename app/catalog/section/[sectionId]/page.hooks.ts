import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {DraggableTableItem} from "@/types/TableTypes";
import {mergePropertyNames} from "@/utils/mergePropertyNames";

export const useCategoriesPage = (sectionId : number) => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const [
        sortableCategories,
        setSortableCategories
    ] = useState<DraggableTableItem[]>([])

    const [categories, getCategories] = useStore(
        useShallow(state =>
            [state.categories, state.getCategories])
    )

    const mapCategoryToDraggableItem = () => {
        return categories.map((category) => {
            return new Object({
                orderId: category.orderId,
                items: [category.name, mergePropertyNames(category.properties)],
                id: category.id,
            }) as DraggableTableItem
        })
    }

    const getCategoriesQuery = useQuery({
        queryKey : ["get", "categoryList"],
        queryFn : () => getCategories(sectionId),
        onSuccess : () => setSortableCategories(mapCategoryToDraggableItem)
    })

    const handleClosePage = () => router.back()
    const handleAddCategory = () => router.push(pathName.concat('/new'))
    const handleDeleteClick = (itemId : number) => console.log("DELETED")
    const handleEditClick = (itemId : number) => console.log("EDITED")
    const handleItemClick = (itemId : number) => router.push(pathName.concat(`/category/${itemId}`))

    return {
        sortableCategories, getCategoriesQuery,
        handleClosePage, handleAddCategory, handleDeleteClick,
        handleEditClick, handleItemClick
    }

}