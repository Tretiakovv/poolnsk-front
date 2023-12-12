import {DragEndEvent} from "@dnd-kit/core";
import {useState} from "react";
import {arrayMove} from "@dnd-kit/sortable";
import {SortableItem} from "@/types/Sortable";

export const useSortableListWrapper = (initialState: SortableItem<any>[]) => {

    const [
        items,
        setItems
    ] = useState<SortableItem<any>[]>(initialState)

    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.orderId === active.id);
                const newIndex = items.findIndex((item) => item.orderId === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return {state: items, onDragEnd}

}