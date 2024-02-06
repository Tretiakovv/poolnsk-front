import React, {ChangeEvent} from 'react';
import {TextInputProps} from "@/components/atoms/inputs/text-input/TextInput";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";


const TextArea = (props : TextInputProps) => {

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
                    <textarea
                        maxLength={props.maxLength}
                        disabled={props.disabled}
                        className={"min-h-[100px] max-h-[200px] w-full focus:outline-none border-2 border-second-light-blue rounded-xl px-5 py-4"}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)}
                        value={props.value}
                        placeholder={props.placeholder}
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

export default TextArea;
