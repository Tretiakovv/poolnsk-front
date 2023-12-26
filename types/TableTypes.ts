import {SortableProps} from "@/types/components/SortableProps";
import {TextLinkItem} from "@/types/TextLinkItem";
import React from "react";
import {DragEndEvent} from "@dnd-kit/core";

export type TableItem = {
    id : number
    items : string[] | TextLinkItem[]
}

export type DraggableTableItem = {
    orderId : number
} & TableItem

export type TableClassNames = {
    text ?: string
}

export type TableContentProps = {
    draggable ?: boolean,
    onItemClick?: (itemId: number) => void,
    tableContent: (TableItem | DraggableTableItem)[],
    handleDragEnd ?: (event: DragEndEvent) => void,
    classNames ?: TableClassNames,
    items ?: any[],
}

export type TableItemProps = {
    tableItem : TableItem | DraggableTableItem,
    item ?: any
} & Omit<TableContentProps, "tableContent"> & SortableProps