import {useStore} from "@/store/store";
import {useState} from "react";
import {DraggableTableItem, TableItem} from "@/types/TableTypes";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useShallow} from "zustand/react/shallow";
import {usePathname, useRouter} from "next/navigation";
import {useToggle} from "@/utils/hooks/useToggle";
import {useDragEnd} from "@/utils/hooks/useDragEnd";
import {DragEndEvent} from "@dnd-kit/core";
import {APIResponseState} from "@/types/dto/APIResponseState";

export const useOurProjectsPage = () => {

    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()

    const [projects, getProjects] = useStore(
        useShallow(state =>
            [state.projects, state.getProjects])
    )

    const deleteOurProject = useStore(state => state.deleteOurProject)

    const [
        itemToDelete,
        setItemToDelete
    ] = useState<TableItem>()

    const {...deleteToggle} = useToggle(false)

    const [
        sortableProjects,
        setSortableProjects
    ] = useState<DraggableTableItem[]>([])

    const mapProjectsToDraggableItems = () => {
        return projects.map((item) => {
            return new Object({
                id : item.id,
                orderId : item.orderId,
                items : [item.name, item.workType, item.terms]
            }) as DraggableTableItem
        })
    }

    const getProjectsQuery = useQuery({
        queryKey : ["get", "projectList"],
        queryFn : () => getProjects(),
        onSuccess : () => {
            setSortableProjects(mapProjectsToDraggableItems)
        }
    })

    const handleDragEnd = (event : DragEndEvent) => {
        const updatedItems = useDragEnd(event, sortableProjects)
        setSortableProjects(updatedItems as DraggableTableItem[])
    }

    const deleteOurProjectMutation = useMutation({
        // @ts-ignore
        mutationKey : ["delete", "ourProject", itemToDelete?.id],
        mutationFn : () => itemToDelete && deleteOurProject(itemToDelete?.id),
        onSuccess : () => {
            queryClient.invalidateQueries(["get", "projectList"])
            setItemToDelete(undefined)
        },
        onError : () => deleteToggle.toggleState()
    })

    const mapItemsToOrderMap = () => {
        const orderMap: Record<string, string> = {}
        sortableProjects.forEach((item, index) => orderMap[item.id] = String(index + 1))
        return orderMap
    }

    const [
        orderState,
        changeOrderState
    ] = useState<APIResponseState>("idle")

    const changeOrder = useStore(state => state.changeOurProjectOrder)
    const changeOrderMutation = useMutation({
        mutationKey : ["changeOrder", "ourProjects"],
        mutationFn : () => changeOrder(mapItemsToOrderMap()),
        onSuccess : () => changeOrderState("success"),
        onError : () => changeOrderState("error")
    })

    const handleAddProject = () => router.push(pathname.concat("/new"))
    const handleDeleteItem = () => deleteOurProjectMutation.mutate()
    const handleChangeOrder = () => changeOrderMutation.mutate()

    return {
        sortableProjects, getProjectsQuery,
        handleAddProject, handleDeleteItem, setItemToDelete, itemToDelete, deleteToggle,
        handleDragEnd, handleChangeOrder, orderState, changeOrderState
    }

}