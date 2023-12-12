import React from 'react';
import {Section} from "@/types/Section";
import DragIcon from "@/components/svg/drag-icon/DragIcon";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";
import Text from "@/components/atoms/text/Text";
import EditIcon from "@/components/svg/edit-icon/EditIcon";
import DeleteIcon from "@/components/svg/delete-icon/DeleteIcon";
import {SortableItem} from "@/types/Sortable";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";

type CatalogSectionRowProps = {
    sortableSection: SortableItem<Section>,
    setActivatorNodeRef?: (element: (HTMLElement | null)) => void,
    listeners?: SyntheticListenerMap | undefined,
    attributes?: DraggableAttributes
}
const CatalogSectionRow = ({sortableSection, ...props}: CatalogSectionRowProps) => {

    const mainWrapperCV: ClassValue[] = [
        "hover:bg-second-border-gray hover:bg-opacity-30 hover:cursor-pointer",
        "px-[30px] flex flex-row justify-between py-6"
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
                    <Text
                        text={sortableSection.item.name}
                        className={"text-base text-main-black"}
                    />
                </div>
                <div className={"flex flex-row items-center gap-2"}>
                    <EditIcon onClick={() => console.log("CLICKED")}/>
                    <DeleteIcon onClick={() => console.log("DELETED")}/>
                </div>
            </div>
        </div>
    );
};

export default CatalogSectionRow;
