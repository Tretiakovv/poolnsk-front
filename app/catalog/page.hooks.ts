import {useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {DraggableTableItem, TableItem} from "@/types/TableTypes";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

export const useCatalogSectionsPage = () => {

    const queryClient = useQueryClient()
    const router: AppRouterInstance = useRouter()
    const pathname = usePathname()

    const [
        itemToDelete,
        setItemToDelete
    ] = useState<TableItem>()

    const [
        deleteError,
        setDeleteError
    ] = useState<boolean>(false)

    const [sections, getSections] = useStore(
        useShallow(state => [state.sections, state.getSections])
    )

    const deleteSection = useStore(state => state.deleteSection)

    const deleteSectionMutation = useMutation({
        mutationKey : ["delete", "section"],
        mutationFn : (sectionId : number) => deleteSection(sectionId),
        onSuccess : () => {
            queryClient.invalidateQueries(["get", "sectionList"])
            setItemToDelete(undefined)
        },
        onError : () => setDeleteError(true)
    })

    const [
        sortableSections,
        setSortableSections
    ] = useState<DraggableTableItem[]>([])

    const mapSectionToDraggableItem = () => {
        return sections.sort((fst, snd) => fst.orderId!! < snd.orderId!! ? -1 : 1)
            .map((section) => {
            return new Object({
                orderId: section.orderId,
                items: [section.name],
                id: section.id,
            }) as DraggableTableItem
        })

    }

    const getSectionsQuery = useQuery({
        queryKey: ["get", "sectionList"],
        queryFn: getSections,
        onSuccess: () => setSortableSections(mapSectionToDraggableItem)
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setSortableSections((items) => {
                const oldIndex = items.findIndex((item) => item.orderId == active.id);
                const newIndex = items.findIndex((item) => item.orderId == over?.id);
                return arrayMove(items, oldIndex, newIndex)
            });
        }
    }

    const mapItemsToOrderMap = () => {
        const orderMap: Record<string, string> = {}
        sortableSections.forEach((item, index) => orderMap[item.id] = String(index + 1))
        return orderMap
    }

    const putOrderMap = useStore(state => state.changeOrder)
    const handleChangeOrder = () => putOrderMap(mapItemsToOrderMap())

    const handleItemClick = (itemId: number) => router.push(`/catalog/section/${itemId}`)
    const handleDeleteClick = () => itemToDelete && deleteSectionMutation.mutate(itemToDelete.id)
    const handleEditClick = (itemId: number) => console.log("EDITED")
    const handleAddSection = () => router.push(pathname.concat("/new"))

    return {
        getSectionsQuery, sortableSections, handleItemClick,
        handleDeleteClick, handleEditClick, handleDragEnd,
        handleAddSection, mapItemsToOrderMap, handleChangeOrder,
        setItemToDelete, itemToDelete, deleteError, setDeleteError
    }

}