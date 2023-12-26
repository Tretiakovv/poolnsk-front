import {DragEndEvent} from "@dnd-kit/core";
import {useEffect, useState} from "react";
import {arrayMove} from "@dnd-kit/sortable";

export const useSortableListWrapper = (initialState: any[]) => {

    const [items, setItems] = useState<any[]>(initialState)

    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.orderId == active.id);
                const newIndex = items.findIndex((item) => item.orderId == over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    useEffect(() => {
        setItems(initialState)
    }, [])

    return {state: items, onDragEnd}

}