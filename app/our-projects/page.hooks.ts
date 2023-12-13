import {useStore} from "@/store/store";
import {useState} from "react";
import {DraggableTableItem} from "@/types/TableTypes";
import {useQuery} from "react-query";
import {useShallow} from "zustand/react/shallow";

export const useOurProjectsPage = () => {

    const [projects, getProjects] = useStore(
        useShallow(state =>
            [state.projects, state.getProjects])
    )

    const [
        sortableProjects,
        setSortableProjects
    ] = useState<DraggableTableItem[]>([])

    const [
        isPublished,
        setIsPublished
    ] = useState<boolean>(false)

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

    const handlePublish = () => setIsPublished(!isPublished)

    return {
        sortableProjects, getProjectsQuery,
        isPublished, handlePublish
    }

}