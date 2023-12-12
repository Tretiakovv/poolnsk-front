import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";

type GridWrapperProps = {
    children : React.ReactNode,
    className ?: string,
}

const GridWrapper = (props : GridWrapperProps) => {

    const wrapperCV : ClassValue[] = [
        "grid grid-cols-12 gap-x-[20px] gap-y-[30px]",
        props?.className
    ]

    return (
        <div className={cn(wrapperCV)}>
            {props.children}
        </div>
    );
};

export default GridWrapper;
