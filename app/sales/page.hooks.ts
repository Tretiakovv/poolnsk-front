import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {DraggableTableItem} from "@/types/TableTypes";
import {useState} from "react";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

export const useSalesPage = () => {

    const [promotions, getPromotions] = useStore(
        useShallow(state =>
            [state.promotions, state.getPromotions])
    )

    const [
        sortablePromotions,
        setSortablePromotions
    ] = useState<DraggableTableItem[]>([])

    const [
        isPublished,
        setIsPublished
    ] = useState<boolean>(false)

    const mapPromotionsToDraggableItems = () => {
        return promotions.map((item) => {

            const promotionType = item.createdByPhoto
                ? "Акция-картинка" : "Акция-товар"

            return new Object({
                id : item.id,
                orderId : item.orderId,
                items : [item.link, promotionType]
            }) as DraggableTableItem

        })
    }

    const getPromotionsQuery = useQuery({
        queryKey : ["get", "promotionList"],
        queryFn : () => getPromotions(),
        onSuccess : () => {
            setSortablePromotions(mapPromotionsToDraggableItems)
            console.log(sortablePromotions)
        }
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setSortablePromotions((items) => {
                const oldIndex = items.findIndex((item) => item.orderId == active.id);
                const newIndex = items.findIndex((item) => item.orderId == over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const handlePublish = () => setIsPublished(!isPublished)

    return {
        sortablePromotions, getPromotionsQuery,
        isPublished, handlePublish, handleDragEnd
    }

}