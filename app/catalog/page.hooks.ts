import {Section} from "@/types/dto/Section";
import {useState} from "react";
import {prepareSortableItems} from "@/utils/prepareSortableItems";
import {sections} from "@/mock/catalogData";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

export const useCatalogSectionsPage = () => {

    const router : AppRouterInstance = useRouter()

    const [
        published,
        setPublished
    ] = useState<boolean>(true)

    const [
        sortableItems,
        setSortableItems
    ] = useState<Section[]>(prepareSortableItems(sections) as Section[])

    const handlePublish = () => setPublished(!published)
    const handleItemClick = (item : any & {id : number}) => router.push("/catalog/section/1")

    return {
        sortableItems, published,
        handlePublish, handleItemClick
    }

}