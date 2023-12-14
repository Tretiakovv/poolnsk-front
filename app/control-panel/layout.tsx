"use client"

import MultiselectButton, {
    MultiselectButtonItem
} from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import React, {useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";

const ControlPageLayout = ({children} : {
    children : React.ReactNode
}) => {

    const router : AppRouterInstance = useRouter()

    const tabs : MultiselectButtonItem[] = [
        {
            buttonText : "Заявки",
            action : () => router.push('/control-panel/requests')
        },
        {
            buttonText : "Заказы",
            action : () => router.push('/control-panel/orders')
        }
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<MultiselectButtonItem>(tabs[0])

    return (
        <>
            <HeaderRow
                header={"Панель управления"}
                leftContent={
                    <MultiselectButton
                        setActiveItem={setActiveItem}
                        activeItem={activeItem}
                        items={tabs}
                    />
                }
            />
            {children}
        </>
    );

};

export default ControlPageLayout;
