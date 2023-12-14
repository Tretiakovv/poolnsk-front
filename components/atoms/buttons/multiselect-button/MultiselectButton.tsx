import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";

export type MultiselectButtonItem = {
    buttonText: string
    action: () => void
}

type MultiselectButtonProps = {
    items: MultiselectButtonItem[],
    activeItem: MultiselectButtonItem,
    setActiveItem: (item: MultiselectButtonItem) => void
}

const MultiselectButton = (props: MultiselectButtonProps) => {

    const buttonItemCV: ClassValue[] = [
        "text-main-black font-medium border-2 border-r-0 border-second-border-gray px-8 py-3",
        "transition hover:duration-200 hover:bg-second-border-gray hover:cursor-pointer",
    ]

    console.log(props.activeItem)

    return (
        <div className={"w-full flex flex-row items-center gap-0"}>
            {
                props.items.map((item, index) => {

                    const activeItemCV: ClassValue = {
                        "bg-main-black text-white hover:bg-main-black": item.buttonText === props.activeItem.buttonText,
                        "rounded-l-xl": index === 0,
                        "rounded-r-xl border-2": index === props.items.length - 1
                    }

                    return (
                        <div
                            onClick={() => {
                                props.setActiveItem(item)
                                item.action()
                            }}
                            className={cn(buttonItemCV, activeItemCV)}
                        >
                            {item.buttonText}
                        </div>
                    )

                })
            }
        </div>
    );

};

export default MultiselectButton;
