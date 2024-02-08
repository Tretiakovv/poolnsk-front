import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import React from "react";

type ButtonProps = {
    onClick: () => void,
    buttonText ?: string,
    className?: string,
    icon ?: React.ReactNode,
    type?: "button" | "submit",
}

const Button = ({type = "button", ...props}: ButtonProps) => {

    const buttonCV: ClassValue[] = [
        "text-main-white text-base font-medium",
        "w-fit px-8 py-3 rounded-xl bg-second-gray-selected",
        "hover:bg-main-blue transition hover:duration-150",
        "hover:outline-0 focus:outline-0", props?.className
    ]

    return (
        <button
            className={cn(buttonCV)}
            type={type}
            onClick={props.onClick}
        >
            {props.icon}
            {props.buttonText}
        </button>
    );

};

export default Button;
