import React, {useState} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {Option} from "@/types/Option";
import Text from "@/components/atoms/text/Text";

type SelectInputProps = {
    options: Option[],
    activeOption: Option | undefined,
    onSelectOption: (option: Option) => void,
    placeholder ?: string,
    className?: string
}

const SelectInput = (props: SelectInputProps) => {

    const [isExpanded, setExpanded] = useState<boolean>(false)

    const wrapperCV: ClassValue[] = [
        "w-full px-5 py-4 rounded-xl border-2 flex-row",
        "border-second-light-blue items-center justify-between"
    ]

    const textCV : ClassValue[] = [
        "text-base text-main-black",
        {"text-second-gray" : !props.activeOption}
    ]

    return (
        <div className={cn("w-full flex flex-col", props.className)}>
            <div className={cn(wrapperCV)}>
                <div className={"flex flex-row items-center justify-between"}>
                    {
                        typeof props.activeOption?.value === "string" ?
                            <Text
                                text={props.activeOption?.value ?? props.placeholder}
                                className={cn(textCV)}
                            /> : props.activeOption?.value
                    }
                    <ChevronButton isExpanded={isExpanded} setExpanded={setExpanded}/>
                </div>
                {
                    isExpanded && props.options.map((option, index) => {

                        const optionCV: ClassValue[] = [
                            "py-4 mx-[-20px] px-5 hover:cursor-pointer",
                            "hover:bg-second-light-blue hover:text-main-black",
                            "hover:duration-200 transition",
                            {"bg-second-light-blue text-main-black" : option.value === props.activeOption?.value},
                            {"mt-5" : index === 0}
                        ]

                        return (
                            <div
                                onClick={() => props.onSelectOption(option)}
                                className={cn(optionCV, "border-0")}
                            >
                                {option.value}
                            </div>
                        )

                    })
                }
            </div>
        </div>
    );

};

export default SelectInput;
