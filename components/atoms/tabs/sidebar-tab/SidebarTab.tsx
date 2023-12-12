import React from 'react';
import {TextLinkItem} from "@/types/TextLinkItem";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";

type SidebarTabProps = {
    tab: TextLinkItem,
    isSelected: boolean,
    onSelect: () => void
}

const SidebarTab = (props: SidebarTabProps) => {

    const wrapperCV: ClassValue[] = [
        "w-full px-5 py-3 bg-main-black rounded-xl",
        "hover:bg-second-gray-selected hover:cursor-pointer",
        "transition hover:duration-150",
        {"bg-second-gray-selected": props.isSelected}
    ]

    return (
        <div
            onClick={props.onSelect}
            className={cn(wrapperCV)}
        >
            <Text className={"text-main-white"} text={props.tab.text}/>
        </div>
    );

};

export default SidebarTab;
