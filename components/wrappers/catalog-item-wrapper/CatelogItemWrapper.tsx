import React from 'react';
import {cn} from "@/utils/cn";
import DragIcon from "@/components/svg/drag-icon/DragIcon";
import {ClassValue} from "clsx";
import {SortableProps} from "@/types/components/SortableProps";

type CatalogItemWrapperProps = {
    children: React.ReactNode,
    draggable?: boolean,
    rightContent?: React.ReactNode
} & SortableProps

const CatalogItemWrapper = ({draggable = false, ...props}: CatalogItemWrapperProps) => {

    const mainWrapperCV: ClassValue[] = [
        "hover:bg-second-border-gray hover:bg-opacity-30",
        "px-[30px] hover:cursor-pointer flex flex-row justify-between py-6",
        {"px-[40px]" : !draggable}
    ]

    return (
        <div className={"mx-[-30px]"}>
            <div className={cn(mainWrapperCV)}>
                <div className={"w-full flex flex-row items-center gap-[40px]"}>
                    {
                        draggable && <div
                            className={"hover:cursor-grab active:cursor-grabbing"}
                            {...props.attributes}
                            {...props.listeners}
                            ref={props.setActivatorNodeRef}
                        >
                            <DragIcon/>
                        </div>
                    }
                    {props.children}
                </div>
                {props.rightContent}
            </div>
            <div className={"mx-[30px] border-b-2 border-second-border-gray"}/>
        </div>
    );

};

export default CatalogItemWrapper;
