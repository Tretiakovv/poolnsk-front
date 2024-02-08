import {MultiselectButtonItem} from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useState} from "react";

export const useNewSalePage = () => {

    const multiselectItems : MultiselectButtonItem[] = [
        {buttonText : "Акция-картинка"},
        {buttonText : "Акция-товар"},
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<MultiselectButtonItem>(multiselectItems[0])

    return {
        multiselectButton : {items : multiselectItems, activeItem, setActiveItem}
    }

}