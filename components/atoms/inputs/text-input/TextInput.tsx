import React, {ChangeEvent} from 'react';
import Text from "@/components/atoms/text/Text";
import {cn} from "@/utils/cn";

type TextInputProps = {
    value: string,
    placeholder: string,
    onChange: (newVal: string) => void,
    labelText?: string,
    hintText?: string,
    className?: string
    disabled?: boolean,
    errorMessage?: string,
    maxLength?: number,
    rightContent?: React.ReactNode | string,
    numbersOnly?: boolean
}

const TextInput = ({numbersOnly = false, ...props}: TextInputProps) => {

    const handleKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (numbersOnly && !/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <div className={cn("w-full flex flex-col gap-4", props.className)}>
            {
                props.labelText && <Text
                    text={props.labelText}
                    className={"text-[18px] font-semibold text-main-black"}
                />
            }
            <div className={"w-full flex flex-col gap-2"}>
                <div className={"relative w-full"}>
                    <input
                        maxLength={props.maxLength}
                        disabled={props.disabled}
                        className={"w-full focus:outline-none border-2 border-second-light-blue rounded-xl px-5 py-4"}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
                        value={props.value}
                        placeholder={props.placeholder}
                        onKeyPress={handleKeyPress}
                    />
                    <div className={"absolute z-10 right-5 top-[18px]"}>
                        {props.rightContent}
                    </div>
                </div>
                {
                    props.hintText && <Text
                        className={"text-[14px] text-second-gray"}
                        text={props.hintText}
                    />
                }
                {
                    props.errorMessage && <Text
                        className={"text-[14px] text-indicator-text-red"}
                        text={props.errorMessage}
                    />
                }
            </div>
        </div>
    );
};

export default TextInput;
