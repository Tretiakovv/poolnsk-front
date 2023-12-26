import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {DraggableTableItem} from "@/types/TableTypes";
import {mergePropertyNames} from "@/utils/mergePropertyNames";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

export const useCategoriesPage = (sectionId : number) => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const [
        sortableCategories,
        setSortableCategories
    ] = useState<DraggableTableItem[]>([])

    const [sections, getSections] = useStore(
        useShallow(state =>
            [state.sections, state.getSections])
    )

    const [sectionName, setSectionName] = useState<string>("")

    const findAndSetSectionName = () => {
        const section = sections.find((section) => section.id == sectionId)
        setSectionName(section?.name ?? "")
    }

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

    const getSectionsQuery = useQuery({
        queryKey : ["get", "sections"],
        queryFn : () => getSections(),
        onSuccess : () => findAndSetSectionName()
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setSortableCategories((items) => {
                const oldIndex = items.findIndex((item) => item.orderId == active.id);
                const newIndex = items.findIndex((item) => item.orderId == over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const handleClosePage = () => router.back()
    const handleAddCategory = () => router.push(pathName.concat('/new'))
    const handleDeleteClick = (itemId : number) => console.log("DELETED")
    const handleEditClick = (itemId : number) => console.log("EDITED")
    const handleItemClick = (itemId : number) => router.push(pathName.concat(`/category/${itemId}`))

    return {
        sortableCategories, getCategoriesQuery,
        handleClosePage, handleAddCategory, handleDeleteClick,
        handleEditClick, handleItemClick, sectionName, getSectionsQuery,
        handleDragEnd
    }

}