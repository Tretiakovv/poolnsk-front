import React from 'react';
import {TextItem} from "@/types/TextItem";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";
import {ClassValue} from "clsx";

type HelperHintRowClassNames = {
    mainWrapper?: string,
    text?: string
}

type HelperHintRowProps = {
    items: TextItem[],
    classNames?: HelperHintRowClassNames,
    draggable?: boolean,
}

const HelperHintRow = ({draggable = false, ...props}: HelperHintRowProps) => {

    const mainWrapperCV: ClassValue[] = [
        "col-span-full h-fit px-[10px] py-[30px] border-b-2",
        "border-second-border-gray flex flex-row gap-[20px]",
        {"px-[62px]": draggable},
        props.classNames?.mainWrapper
    ]

    const textCV: ClassValue[] = [
        "text-second-gray text-base font-medium w-[350px]",
        props.classNames?.text
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            {
                props.items.map((item, index) =>
                    <Text key={index} text={item.text} className={cn(textCV)}/>)
            }
        </div>
    );

};

export default HelperHintRow;
