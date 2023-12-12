import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";

type HeaderRowClassNames = {
    mainWrapper ?: string,
    innerWrapper ?: string
}

type HeaderRowProps = {
    header : string,
    leftContent ?: React.ReactNode,
    rightContent ?: React.ReactNode,
    classNames ?: HeaderRowClassNames
}

const HeaderRow = (props : HeaderRowProps) => {

    const mainWrapperCV : ClassValue[] = [
        "h-fit col-span-full flex flex-row pb-[30px] border-b-2",
        "border-second-border-gray justify-between",
        props.classNames?.mainWrapper
    ]

    const innerWrapperCV: ClassValue[] = [
        "flex flex-row items-center gap-[20px]",
        props.classNames?.innerWrapper
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            <div className={cn(innerWrapperCV)}>
                <Text
                    text={props.header}
                    className={"text-[28px] text-main-black font-semibold"}
                />
                {props.leftContent}
            </div>
            {props.rightContent}
        </div>
    );

};

export default HeaderRow;
