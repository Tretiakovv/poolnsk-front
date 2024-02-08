import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useState} from "react";
import {DragEndEvent} from "@dnd-kit/core";
import {usePathname, useRouter} from "next/navigation";
import {useDragEnd} from "@/utils/hooks/useDragEnd";
import {Promotion} from "@/types/dto/Promotion";
import {SortableItem} from "@/types/Sortable";
import {useToggle} from "@/utils/hooks/useToggle";

const NOT_EXIST_INDEX = -1

export const useSalesPage = () => {

    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()

    const [
        indexToDelete,
        setIndexToDelete
    ] = useState<number>(NOT_EXIST_INDEX)

    const {...deleteToggle} = useToggle(false)

    const [promotions, getPromotions] = useStore(
        useShallow(state =>
            [state.promotions, state.getPromotions])
    )

    const [
        sortablePromotions,
        setSortablePromotions
    ] = useState<SortableItem<Promotion>[]>([])

    const mapPromotionsToDraggableItems = () => {
        return promotions.map((item : Promotion) => {
            return new Object({
                id : item.id,
                orderId : item.orderId,
                item : item
            }) as SortableItem<Promotion>
        })
    }

    const getPromotionsQuery = useQuery({
        queryKey : ["get", "promotionList"],
        queryFn : () => getPromotions(),
        onSuccess : () => {
            setSortablePromotions(mapPromotionsToDraggableItems)
        }
    })

    const deletePromotion = useStore(state => state.deletePromotion)
    const deletePromotionMutation = useMutation({
        //@ts-ignore
        mutationKey : ["delete", "promotion", indexToDelete],
        mutationFn : () => indexToDelete > 0 && deletePromotion(indexToDelete),
        onSuccess : () => {
            queryClient.invalidateQueries(["get", "promotionList"])
            setIndexToDelete(NOT_EXIST_INDEX)
        },
        onError : () => deleteToggle.toggleState()
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const updatedItems = useDragEnd(event, sortablePromotions)
        setSortablePromotions(updatedItems as SortableItem<Promotion>[])
    }

    const handleDeleteItem = () => deletePromotionMutation.mutate()
    const handleAddPromotion = () => router.push(pathname.concat("/new"))
    const handleChangeOrder = () => console.log("Change order")

    return {
        sortablePromotions, getPromotionsQuery,
        handleDragEnd, handleAddPromotion, handleChangeOrder,
        handleDeleteItem, indexToDelete, setIndexToDelete, deleteToggle
    }

}