import React, {useState} from 'react';
import {Order} from "@/types/dto/Order";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";

const OrderCardProductList = ({order}: {
    order: Order
}) => {

    const [
        isExpanded,
        setExpanded
    ] = useState<boolean>(false)

    const listItemCV: ClassValue[] = [
        "w-full flex flex-row items-baseline justify-between",
        "pt-5 border-t-2 border-second-border-gray"
    ]

    return (
        <div className={"w-full flex flex-col gap-5 pt-5"}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={"Список товаров"} className={"text-base text-main-black"}/>
                <ChevronButton isExpanded={isExpanded} setExpanded={setExpanded}/>
            </div>
            {
                isExpanded && Object.entries(order.productMap).map(([name, amount]) => (
                    <div className={cn(listItemCV)}>
                        <Text text={name} className={"text-main-black"}/>
                        <Text text={`${amount} шт.`} className={"text-main-black"}/>
                    </div>
                ))
            }
        </div>
    );

};

export default OrderCardProductList;
