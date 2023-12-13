import {useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {DraggableTableItem} from "@/types/TableTypes";

export const useCatalogSectionsPage = () => {

    const router : AppRouterInstance = useRouter()

    const [
        published,
        setPublished
    ] = useState<boolean>(true)

    const [sections, getSections] = useStore(
        useShallow(state => [state.sections, state.getSections])
    )

    const [
        sortableSections,
        setSortableSections
    ] = useState<DraggableTableItem[]>([])

    const mapSectionToDraggableItem = () => {
        return sections.map((section) => {
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
        onSuccess : () => setSortableSections(mapSectionToDraggableItem),
        refetchInterval: 1000 * 60 * 2
    })

    const handlePublish = () => setPublished(!published)
    const handleItemClick = (itemId : number) => router.push(`/catalog/section/${itemId}`)
    const handleDeleteClick = (itemId : number) => console.log("DELETED")
    const handleEditClick = (itemId : number) => console.log("EDITED")

    return {
        getSectionsQuery, sortableSections, published,
        handlePublish, handleItemClick,
        handleDeleteClick, handleEditClick
    }

}