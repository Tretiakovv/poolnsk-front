import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {DraggableTableItem, TableItem} from "@/types/TableTypes";
import {mergePropertyNames} from "@/utils/mergePropertyNames";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

export const useCategoriesPage = (sectionId: number) => {

    const queryClient = useQueryClient()
    const router: AppRouterInstance = useRouter()
    const pathName: string = usePathname()

    const [
        deleteError,
        setDeleteError
    ] = useState<boolean>(false)

    const [
        sectionToEdit,
        selectSectionToEdit
    ] = useState<number>(0)

    const [
        itemToDelete,
        setItemToDelete
    ] = useState<TableItem>()

    const [
        sortableCategories,
        setSortableCategories
    ] = useState<DraggableTableItem[]>([])

    const changeName = useStore(state => state.changeSectionName)

    const [sections, getSections] = useStore(
        useShallow(state =>
            [state.sections, state.getSections])
    )

    const deleteCategory = useStore(state => state.deleteCategory)
    const deleteCategoryMutation = useMutation({
        mutationKey: ["delete", "category"],
        mutationFn: (categoryId: number) => deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries(["get", "categoryList"])
            setItemToDelete(undefined)
        },
        onError: () => setDeleteError(true)
    })

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
        return categories.sort((fst, snd) => fst.orderId!! < snd.orderId!! ? -1 : 1)
            .map((category) => {
                return new Object({
                    orderId: category.orderId,
                    items: [category.name, mergePropertyNames(category.properties)],
                    id: category.id,
                }) as DraggableTableItem
            })
    }

    const getCategoriesQuery = useQuery({
        queryKey: ["get", "categoryList"],
        queryFn: () => getCategories(sectionId),
        onSuccess: () => setSortableCategories(mapCategoryToDraggableItem)
    })

    const getSectionsQuery = useQuery({
        queryKey: ["get", "sections"],
        queryFn: () => getSections(),
        onSuccess: () => findAndSetSectionName()
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

    const mapItemsToOrderMap = () => {
        const orderMap: Record<string, string> = {}
        sortableCategories.forEach((item, index) => orderMap[item.id] = String(index + 1))
        return orderMap
    }

    const changeNameMutation = useMutation({
        mutationKey: ["changeName", "section", sectionId],
        mutationFn: (name: string) => changeName(sectionId, name),
        onSuccess: () => {
            queryClient.invalidateQueries(["get", "sections"])
            selectSectionToEdit(0)
        }
    })

    const putOrderMap = useStore(state => state.changeCategoryOrder)
    const handleChangeOrder = () => putOrderMap(mapItemsToOrderMap())

    const handleClosePage = () => router.back()
    const handleAddCategory = () => router.push(pathName.concat('/new'))
    const handleDeleteClick = () => itemToDelete && deleteCategoryMutation.mutate(itemToDelete.id)
    const handleEditClick = (itemId: number) => console.log("EDITED")
    const handleItemClick = (itemId: number) => router.push(pathName.concat(`/category/${itemId}`))
    const handleChangeName = (name: string) => changeNameMutation.mutate(name)

    return {
        sortableCategories, getCategoriesQuery,
        handleClosePage, handleAddCategory, handleDeleteClick,
        handleEditClick, handleItemClick, sectionName, getSectionsQuery,
        handleDragEnd, handleChangeOrder, itemToDelete, setItemToDelete,
        deleteError, setDeleteError, sectionToEdit, selectSectionToEdit,
        handleChangeName
    }

}