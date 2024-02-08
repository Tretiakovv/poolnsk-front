import {arrayMove} from "@dnd-kit/sortable";
import {DragEndEvent} from "@dnd-kit/core";
import {DraggableTableItem} from "@/types/TableTypes";
import {SortableItem} from "@/types/Sortable";

export const useDragEnd = <T, >(event: DragEndEvent, items: (DraggableTableItem | SortableItem<T>)[]) => {

    const {active, over} = event

    if (active.id === over?.id) return items

    const oldIndex = items.findIndex((item) => item.orderId == active.id)
    const newIndex = items.findIndex((item) => item.orderId == over?.id)

    return arrayMove(items, oldIndex, newIndex)

}