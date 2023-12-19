import React from 'react';
import TableRow from "@/components/organisms/table/talbe-item/TableRow";
import {TableContentProps} from "@/types/TableTypes";

const TableContent = (props : TableContentProps) => {
    return (
        <>
            {
                props.tableContent.map((item, index) => (
                    <TableRow
                        {...props}
                        item={props.items && props.items[index]}
                        onItemClick={props.onItemClick}
                        tableItem={item}
                    />
                ))
            }
        </>
    );
};

export default TableContent;
