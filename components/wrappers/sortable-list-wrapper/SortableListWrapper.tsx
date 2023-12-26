import React from 'react';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {useSortableListWrapper} from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper.hooks";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DraggableTableItem} from "@/types/TableTypes";

type SortableListWrapperProps = {
    items: (any & { orderId: number })[],
    children: React.ReactNode,
    onDragEnd?: (event: DragEndEvent) => void
}

const SortableListWrapper = ({items, children, onDragEnd}: SortableListWrapperProps) => {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            sensors={sensors}
        >
            <SortableContext
                items={items.map((item) => item.orderId)}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );

}

export default SortableListWrapper
