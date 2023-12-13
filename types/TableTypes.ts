import {SortableProps} from "@/types/components/SortableProps";

export type TableItem = {
    id : number
    items : string[]
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
    classNames ?: TableClassNames
}

export type TableItemProps = {
    tableItem : TableItem | DraggableTableItem
} & Omit<TableContentProps, "tableContent"> & SortableProps