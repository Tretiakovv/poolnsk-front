import {arrayMove} from "@dnd-kit/sortable";
import {DragEndEvent} from "@dnd-kit/core";
import {DraggableTableItem} from "@/types/TableTypes";

export const useDragEnd = (event : DragEndEvent, items : DraggableTableItem[]) => {

    const {active, over} = event

    if (active.id === over?.id) return items

    const oldIndex = items.findIndex((item) => item.orderId == active.id)
    const newIndex = items.findIndex((item) => item.orderId == over?.id)

    return arrayMove(items, oldIndex, newIndex)

}