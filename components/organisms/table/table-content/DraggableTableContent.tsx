import React from 'react';
import {DraggableTableItem, TableContentProps} from "@/types/TableTypes";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import TableRow from "@/components/organisms/table/talbe-item/TableRow";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";

const DraggableTableContent = (props: TableContentProps) => {
    return (
        <SortableListWrapper items={props.tableContent}>
            {
                props.tableContent.map((item, index) => (
                    <SortableWrapper id={(item as DraggableTableItem).orderId ?? index}>
                        <TableRow
                            {...props}
                            key={(item as DraggableTableItem).orderId}
                            onItemClick={() => props.onItemClick(item.id)}
                            tableItem={item}
                        />
                    </SortableWrapper>
                ))
            }
        </SortableListWrapper>
    );
};

export default DraggableTableContent;
