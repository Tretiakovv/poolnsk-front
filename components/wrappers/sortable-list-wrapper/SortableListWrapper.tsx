import React from 'react';
import {closestCenter, DndContext} from "@dnd-kit/core";
import {useSortableListWrapper} from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper.hooks";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

type SortableListWrapperProps = {
    items: (any & { orderId: number })[],
    children: React.ReactNode
}

const SortableListWrapper = ({items, children}: SortableListWrapperProps) => {

    const {state, onDragEnd} = useSortableListWrapper(items)

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={state.map((item) => item.orderId)}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );

}

export default SortableListWrapper
