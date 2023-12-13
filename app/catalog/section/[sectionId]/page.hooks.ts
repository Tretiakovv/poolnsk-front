import {useState} from "react";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Category} from "@/types/dto/Category";
import {prepareSortableItems} from "@/utils/prepareSortableItems";
import {categories} from "@/mock/catalogData";

export const useCategoriesPage = (sectionId : number) => {

    const router : AppRouterInstance = useRouter()
    const handleClosePage = () => router.back()

    const [
        sortableItems,
        setSortableItems
    ] = useState<Category[]>(prepareSortableItems(categories) as Category[])

    return {
        sortableItems,
        handleClosePage
    }

}