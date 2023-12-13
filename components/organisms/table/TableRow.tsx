import React from 'react';
import {ClassValue} from "clsx";
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import Text from "@/components/atoms/text/Text";
import {cn} from "@/utils/cn";
import {TableItemProps} from "@/types/TableTypes";

const TableRow = (props: TableItemProps) => {

    const textCV: ClassValue[] = [
        "text-base text-main-black w-[350px]",
        props.classNames?.text
    ]

    return (
        <CatalogItemWrapper {...props}>
            <div
                onClick={() => props.onItemClick(props.tableItem.id)}
                className={"w-full flex flex-row items-center gap-[20px]"}
            >
                {
                    props.tableItem.items.map((item) => (
                        <Text text={item} className={cn(textCV)}/>
                    ))
                }
            </div>
        </CatalogItemWrapper>
    );

};

export default TableRow;
