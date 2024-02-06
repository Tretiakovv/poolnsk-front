import React, {ChangeEvent, LegacyRef, useRef} from 'react';
import Text from "@/components/atoms/text/Text";
import {FiUpload, FiX} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";

type PhotoInputProps = {
    value: File | undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onClear: () => void,
    hintText?: string,
    className?: string,
    labelText?: string
}

const PhotoInput = (props: PhotoInputProps) => {

    const iconCV: ClassValue[] = [
        "stroke-main-black hover:stroke-main-blue",
        "hover:duration-200 transition hover:cursor-pointer"
    ]

    const inputCV: ClassValue[] = [
        "relative w-full flex flex-row items-center justify-between rounded-xl",
        "border-2 border-second-light-blue px-5 py-4",
        props?.className
    ]

    const textCV: ClassValue = {
        "text-second-gray": props.value === undefined,
        "text-main-black": props.value !== undefined
    }

    const handleInputClear = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }


    const inputRef = useRef<HTMLInputElement | undefined>(undefined)

    const handleClick = () => inputRef.current?.click()

    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-col gap-4"}>
                {
                    props.labelText && <Text
                        text={props.labelText}
                        className={"text-[18px] font-semibold text-main-black"}
                    />
                }
                <div className={cn(inputCV)}>
                    <Text
                        text={props.value?.name ?? "Выберите фотографию"}
                        className={cn(textCV)}
                    />
                    {
                        props.value !== undefined ?
                            <FiX size={"20px"}
                                 className={cn(iconCV, "hover:stroke-indicator-text-red")}
                                 onClick={props.onClear}
                            /> : <FiUpload
                                size={"20px"}
                                className={cn(iconCV)}
                                onClick={handleClick}
                            />
                    }
                    <input
                        onClick={handleInputClear}
                        onChange={props.onChange}
                        ref={inputRef as LegacyRef<HTMLInputElement>}
                        className={"w-full hidden absolute left-0 top-0"}
                        type={"file"}
                    />
                </div>
            </div>
            {
                props.hintText && <Text
                    text={props.hintText}
                    className={"text-[14px] text-second-gray"}
                />
            }
        </div>
    );
};

export default PhotoInput;
