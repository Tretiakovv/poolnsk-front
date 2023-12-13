import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Category} from "@/types/dto/Category";
import {prepareSortableItems} from "@/utils/prepareSortableItems";
import {categories} from "@/mock/catalogData";

export const useCategoriesPage = (sectionId : number) => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const handleClosePage = () => router.back()

    const [
        sortableItems,
        setSortableItems
    ] = useState<Category[]>(prepareSortableItems(categories) as Category[])

    const handleAddCategory = () => router.push(pathName.concat('/new'))
    const handleDeleteClick = (itemId : number) => console.log("DELETED")
    const handleEditClick = (itemId : number) => console.log("EDITED")
    const handleItemClick = (itemId : number) => router.push(pathName.concat(`/category/${itemId}`))

    return {
        sortableItems, handleClosePage,
        handleAddCategory, handleDeleteClick,
        handleEditClick, handleItemClick
    }

}