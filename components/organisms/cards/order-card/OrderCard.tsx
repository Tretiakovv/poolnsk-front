"use client"

import {Order, OrderStatus} from "@/types/dto/Order";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import OrderCardHeaderRow from "@/components/organisms/cards/order-card/order-card-header-row/OrderCardHeaderRow";
import OrderCardContent from "@/components/organisms/cards/order-card/order-card-content/OrderCardContent";
import OrderCardProductList from "@/components/organisms/cards/order-card/order-card-product-list/OrderCardProductList";

type OrderCardProps = {
    order: Order,
    curOrderStatus: OrderStatus
}

const OrderCard = (props: OrderCardProps) => {

    const mainWrapperCV: ClassValue[] = [
        "w-full flex bg-main-white flex-col rounded-xl p-5 overflow-clip",
        "rounded-xl border-2 border-second-border-gray"
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            <OrderCardHeaderRow {...props}/>
            <OrderCardContent {...props}/>
            <OrderCardProductList {...props}/>
        </div>
    );

};

export default OrderCard;
