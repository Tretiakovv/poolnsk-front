"use client"

import MultiselectButton, {
    MultiselectButtonItem
} from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useState} from "react";

const ControlPageLayout = () => {

    const items : MultiselectButtonItem[] = [
        {buttonText : "Илья Катешов", action : () => console.log("Лох")},
        {buttonText : "Никита", action : () => console.log("Крутой")},
        {buttonText : "Артём", action : () => console.log("Ещё круче")},
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<MultiselectButtonItem>(items[0])

    return (
        <>
            <MultiselectButton
                items={items}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
        </>
    );

};

export default ControlPageLayout;
