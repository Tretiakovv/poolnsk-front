import React from 'react';
import {FiTrash2} from "react-icons/fi";
import {cn} from "@/utils/cn";

const ActionButton = ({onClick, icon = <FiTrash2 size={"20px"}/>, className} : {
    onClick : () => void,
    icon ?: React.ReactNode,
    className ?: string
}) => {

    const buttonCV = [
        "hover:cursor-pointer text-indicator-text-red w-10 h-10 rounded-xl bg-second-light-blue",
        "flex items-center justify-center hover:duration-200 hover:bg-indicator-delete",
        "hover:text-main-white transition", className
    ]

    return (
        <div
            className={cn(buttonCV)}
            onClick={e => {
                e.stopPropagation(); onClick()
            }}
        >
            {icon}
        </div>
    );
};

export default ActionButton;
