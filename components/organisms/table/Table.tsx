import React from 'react';
import {TextItem} from "@/types/TextItem";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {TableContentProps} from "@/types/TableTypes";
import DraggableTableContent from "@/components/organisms/table/table-content/DraggableTableContent";
import TableContent from "@/components/organisms/table/table-content/TableContent";

type TableProps = {
    tableHeader: TextItem[],
} & TableContentProps

const Table = ({draggable = false, ...props}: TableProps) => {
    return (
        <>
            <HelperHintRow draggable={draggable} items={props.tableHeader}/>
            {
                draggable
                    ? <DraggableTableContent draggable={true} {...props}/>
                    : <TableContent {...props} />
            }
        </>
    );
};

export default Table;
