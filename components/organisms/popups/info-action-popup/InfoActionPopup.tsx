import React, {useState} from "react";
import PopupWrapper from "@/components/organisms/popups/PopupWrapper";
import Text from "@/components/atoms/text/Text";
import {FiX} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";

type InfoActionPopupClassNames = {
    button?: string
}

type SnackbarProps = {
    onClose: () => void,
    isOpen: boolean,
    message: string
}

type InfoActionPopup = {
    header: string,
    message: string,
    buttonText: string,
    onClose: () => void,
    action ?: () => void,
    onChangeName?: (name: string) => void,
    classNames?: InfoActionPopupClassNames,
    snackbarProps?: SnackbarProps
}

const InfoActionPopup = (props: InfoActionPopup) => {

    const [name, setName] = useState<string>("")

    const buttonCV: ClassValue[] = [
        "bg-indicator-delete text-main-white",
        "hover:bg-indicator-text-red transition hover:duration-200"
    ]

    const headerRowCV: ClassValue[] = [
        "w-full flex flex-row border-b-2 border-second-border-gray",
        "items-center justify-between pb-5"
    ]

    return (
        <>
            {
                props.snackbarProps && <ErrorSnackbar
                    {...props.snackbarProps}
                />
            }
            <PopupWrapper>
                <div className={"w-[500px] rounded-xl flex flex-col gap-5 bg-main-white p-5"}>
                    <div className={cn(headerRowCV)}>
                        <Text text={props.header} className={"text-base text-main-black"}/>
                        <FiX onClick={props.onClose} size={"20px"}
                             className={"stroke-main-black hover:cursor-pointer"}/>
                    </div>
                    <Text
                        text={props.message}
                        className={"text-base text-main-black pb-5 border-b-2 border-second-border-gray"}
                    />
                    {
                        props.onChangeName && <TextInput
                            value={name}
                            placeholder={"Введите новое название"}
                            onChange={setName}
                        />
                    }
                    <Button
                        onClick={() => {
                            props.onChangeName?.(name)
                            props.action?.()
                        }}
                        buttonText={props.buttonText}
                        className={cn(buttonCV, props.classNames?.button)}
                    />
                </div>
            </PopupWrapper>
        </>
    );
};

export default InfoActionPopup;
