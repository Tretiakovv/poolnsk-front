import React from 'react';
import {cn} from "@/utils/cn";
import DragIcon from "@/components/svg/drag-icon/DragIcon";
import EditIcon from "@/components/svg/edit-icon/EditIcon";
import DeleteIcon from "@/components/svg/delete-icon/DeleteIcon";
import {ClassValue} from "clsx";
import {SortableProps} from "@/types/components/SortableProps";

type CatalogItemWrapperProps = {
    children : React.ReactNode
} & SortableProps

const CatalogItemWrapper = (props : CatalogItemWrapperProps) => {

    const mainWrapperCV: ClassValue[] = [
        "hover:bg-second-border-gray hover:bg-opacity-30",
        "px-[30px] hover:cursor-pointer flex flex-row justify-between py-6",
    ]

    return (
        <div className={"mx-[-30px]"}>
            <div className={cn(mainWrapperCV)}>
                <div className={"flex flex-row items-center gap-[40px]"}>
                    <div
                        className={"hover:cursor-grab active:cursor-grabbing"}
                        {...props.attributes}
                        {...props.listeners}
                        ref={props.setActivatorNodeRef}
                    >
                        <DragIcon/>
                    </div>
                    {props.children}
                </div>
                <div className={"flex flex-row items-center gap-2"}>
                    <EditIcon onClick={props.onEdit}/>
                    <DeleteIcon onClick={props.onDelete}/>
                </div>
            </div>
            <div className={"mx-[30px] border-b-2 border-second-border-gray"}/>
        </div>
    );

};

export default CatalogItemWrapper;
