import {SortableProps} from "@/types/components/SortableProps";
import {TextLinkItem} from "@/types/TextLinkItem";
import {DragEndEvent} from "@dnd-kit/core";
import React from "react";

export type TableItem = {
    id: number
    items: (string | React.ReactNode)[] | TextLinkItem[]
}

export type DraggableTableItem = {
    orderId: number
} & TableItem

export type TableClassNames = {
    text?: string
}

type EditableProps = {
    onDelete?: (item: TableItem) => void,
    onEdit?: (item: TableItem) => void,
}

export type TableContentProps = {
    tableContent: (TableItem | DraggableTableItem)[],
    onItemClick?: (itemId: number) => void,
    handleDragEnd?: (event: DragEndEvent) => void,
    classNames?: TableClassNames,
    draggable?: boolean,
    editableProps?: EditableProps,
    items?: any[],
}

export type TableItemProps = {
    tableItem: TableItem | DraggableTableItem,
    item?: any
} & Omit<TableContentProps, "tableContent"> & SortableProps