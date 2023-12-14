import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {FiArrowLeft} from "react-icons/fi";

type HeaderRowClassNames = {
    mainWrapper?: string,
    innerWrapper?: string
}

type HeaderRowProps = {
    backIcon?: boolean,
    header: string,
    leftContent?: React.ReactNode,
    rightContent?: React.ReactNode,
    classNames?: HeaderRowClassNames
}

const HeaderRow = (props: HeaderRowProps) => {

    const router: AppRouterInstance = useRouter()
    const handleBackClick = () => router.back()

    const mainWrapperCV: ClassValue[] = [
        "h-fit col-span-full flex flex-row items-center pb-[30px] border-b-2",
        "border-second-border-gray justify-between",
        props.classNames?.mainWrapper
    ]

    const innerWrapperCV: ClassValue[] = [
        "flex flex-row items-center gap-[20px]",
        props.classNames?.innerWrapper
    ]

    const backIconCV: ClassValue[] = [
        "stroke-second-gray hover:stroke-main-black",
        "transition hover:duration-200 hover:cursor-pointer"
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            <div className={cn(innerWrapperCV)}>
                {
                    props.backIcon && <FiArrowLeft
                        size={"22px"}
                        className={cn(backIconCV)}
                        onClick={handleBackClick}
                    />
                }
                <Text
                    text={props.header}
                    className={"text-[28px] whitespace-nowrap text-main-black font-semibold"}
                />
                {props.leftContent}
            </div>
            {props.rightContent}
        </div>
    );

};

export default HeaderRow;
