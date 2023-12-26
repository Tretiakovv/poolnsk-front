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
    disabled ?: boolean,
}

const TextInput = (props: TextInputProps) => {
    return (
        <div className={cn("w-full flex flex-col gap-4", props.className)}>
            {
                props.labelText && <Text
                    text={props.labelText}
                    className={"text-[18px] font-semibold text-main-black"}
                />
            }
            <div className={"w-full flex flex-col gap-2"}>
                <input
                    disabled={props.disabled}
                    className={"w-full focus:outline-none border-2 border-second-light-blue rounded-xl px-5 py-4"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
                    value={props.value}
                    placeholder={props.placeholder}
                />
                {
                    props.hintText && <Text
                        className={"text-[14px] text-second-gray"}
                        text={props.hintText}
                    />
                }
            </div>
        </div>
    );
};

export default TextInput;
