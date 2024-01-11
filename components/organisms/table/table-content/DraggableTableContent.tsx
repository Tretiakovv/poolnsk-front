import React from 'react';
import {DraggableTableItem, TableContentProps} from "@/types/TableTypes";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import TableRow from "@/components/organisms/table/talbe-item/TableRow";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";

const DraggableTableContent = (props: TableContentProps) => {
    return (
        <SortableListWrapper
            onDragEnd={props.handleDragEnd}
            items={props.tableContent as DraggableTableItem[]}
        >
            {
                (props.tableContent as DraggableTableItem[])
                    .map((item) => (
                    <SortableWrapper key={item.orderId} id={item.orderId}>
                        <TableRow
                            {...props}
                            onItemClick={() => {
                                if (props.onItemClick) {
                                    props.onItemClick(item.id)
                                }
                            }}
                            tableItem={item}
                        />
                    </SortableWrapper>
                ))
            }
        </SortableListWrapper>
    );
};

export default DraggableTableContent;
