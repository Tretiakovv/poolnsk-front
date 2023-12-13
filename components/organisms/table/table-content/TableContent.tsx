import React from 'react';
import TableRow from "@/components/organisms/table/TableRow";
import {TableContentProps} from "@/types/TableTypes";

const TableContent = (props : TableContentProps) => {
    return (
        <>
            {
                props.tableContent.map((item) => (
                    <TableRow
                        onItemClick={props.onItemClick}
                        tableItem={item}
                    />
                ))
            }
        </>
    );
};

export default TableContent;
