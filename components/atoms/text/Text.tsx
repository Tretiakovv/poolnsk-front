import {Text} from "@/types/text"
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";


const Text = (props : Text) => {

    const textCV : ClassValue[] = [
        "text-base font-medium text-main-black",
        props?.className
    ]

    return (
        <h5 className={cn(textCV)}>
            {props.text}
        </h5>
    );

};

export default Text;
