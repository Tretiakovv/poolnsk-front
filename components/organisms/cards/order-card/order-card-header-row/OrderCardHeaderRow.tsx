import {Order, OrderStatus} from "@/types/dto/Order";
import {cn} from "@/utils/cn";
import Button from "@/components/atoms/buttons/button/Button";
import {getOrderStatusText} from "@/utils/getOrderStatusText";
import Text from "@/components/atoms/text/Text";
import {
    useOrderCardHeaderRow
} from "@/components/organisms/cards/order-card/order-card-header-row/OrderCardHeaderRow.hooks";
import {ClassValue} from "clsx";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";

type OrderStatusButton = {
    name: string,
    style: string,
    action: () => void
}

const OrderCardHeaderRow = ({order, curOrderStatus}: {
    curOrderStatus : OrderStatus,
    order: Order
}) => {

    const context = useOrderCardHeaderRow(order.id, curOrderStatus)

    const acceptButtonCV: ClassValue[] = [
        "bg-indicator-green-light hover:bg-indicator-text-green",
        "hover:text-main-white transition hover:duration-200 text-indicator-text-green"
    ]

    const rejectButtonCV: ClassValue[] = [
        "bg-indicator-red-light text-indicator-text-red hover:bg-indicator-text-red",
        "hover:text-main-white transition hover:duration-200"
    ]

    const closeButtonCV: ClassValue[] = [
        "bg-second-light-blue text-main-black hover:bg-main-black",
        "hover:text-main-white transition hover:duration-200"
    ]

    // @ts-ignore
    const orderTypeButtonMap: Record<OrderStatus, OrderStatusButton> = {
        "PROCESSING": {
            name: "Подтвердить", action: context.handleAcceptOrder,
            style: cn(acceptButtonCV)
        },
        "ACTIVE": {
            name: "Завершить", action: context.handleCloseOrder,
            style: cn(closeButtonCV)
        }
    }

    const fullName = order.name + " " + order.surname
    const status = getOrderStatusText(order.status)
    const orderTypeButton = orderTypeButtonMap[order.status]

    const headerRowCV: ClassValue[] = [
        "flex flex-row justify-between items-center pb-5",
        "border-b-2 border-second-border-gray"
    ]

    console.log(context.orderStatus)

    return (
        <>
            {
                context.orderStatus === "CANCEL" ?
                    <InfoActionPopup
                        header={"Отмена заказа"}
                        message={"Вы уверены, что хотите отменить заказ? Это действие нельзя отменить"}
                        buttonText={"Отменить заказ"}
                        onClose={context.onPopupClose}
                        action={context.onPopupRejectOrder}
                    /> : context.orderStatus === "COMPLETE" ?
                        <InfoActionPopup
                            header={"Завершение заказа"}
                            message={"Вы уверены, что хотите завершить заказ? Это действие нельзя отменить"}
                            buttonText={"Завершить заказ"}
                            onClose={context.onPopupClose}
                            action={context.onPopupCloseOrder}
                            classNames={{button : "bg-main-black"}}
                        /> : null
            }
            <div className={cn(headerRowCV)}>

                <div className={"flex flex-row items-center gap-3"}>
                    <Text text={`Заказ №${order.id}`} className={"text-base text-main-black"}/>
                    <div className={"w-1 h-1 rounded-full bg-second-gray"}/>
                    <Text text={fullName} className={"text-base text-main-black"}/>
                    <div className={"w-1 h-1 rounded-full bg-second-gray"}/>
                    <Text text={status ?? ""} className={"text-base text-main-black"}/>
                </div>

                <div className={"flex flex-row items-center gap-2"}>
                    {
                        (order.status === "PROCESSING" || order.status === "ACTIVE") &&
                        <>
                            <Button
                                className={orderTypeButton.style}
                                buttonText={orderTypeButton.name}
                                onClick={orderTypeButton.action}
                            />
                            <Button
                                buttonText={"Отменить"}
                                onClick={context.handleRejectOrder}
                                className={cn(rejectButtonCV)}
                            />
                        </>

                    }
                </div>

            </div>
        </>
    );

};

export default OrderCardHeaderRow;