import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";

const PopupWrapper = ({children} : {
    children : React.ReactNode
}) => {

    const wrapperCV : ClassValue[] = [
        "fixed top-0 left-0 z-10 w-full h-full flex items-center",
        "justify-center bg-main-black bg-opacity-50"
    ]

    return (
        <div className={cn(wrapperCV)}>
            {children}
        </div>
    );
};

export default PopupWrapper;
