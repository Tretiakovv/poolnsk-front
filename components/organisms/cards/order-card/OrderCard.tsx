"use client"

import {Order} from "@/types/dto/Order";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import OrderCardHeaderRow from "@/components/organisms/cards/order-card/order-card-header-row/OrderCardHeaderRow";
import OrderCardContent from "@/components/organisms/cards/order-card/order-card-content/OrderCardContent";
import OrderCardProductList from "@/components/organisms/cards/order-card/order-card-product-list/OrderCardProductList";

const OrderCard = ({order}: {
    order: Order
}) => {

    const mainWrapperCV: ClassValue[] = [
        "w-full flex flex-col rounded-xl p-5 overflow-clip",
        "rounded-xl border-2 border-second-border-gray"
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            <OrderCardHeaderRow order={order}/>
            <OrderCardContent order={order}/>
            <OrderCardProductList order={order}/>
        </div>
    );

};

export default OrderCard;
