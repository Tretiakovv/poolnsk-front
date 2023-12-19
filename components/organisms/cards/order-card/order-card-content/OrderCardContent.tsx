import {Order} from "@/types/dto/Order";
import Text from "@/components/atoms/text/Text";

const OrderCardContent = ({order}: {
    order: Order
}) => {

    const paymentModeText =
        order.paymentMode === "OFFLINE"
            ? "Наличными при получении"
            : "Банковской картой онлайн"

    const orderCardData = [
        {header: "Дата оформления заказа", data: order.creationDate.slice(0, 10)},
        {header: "Телефон", data: order.phoneNumber},
        {header: "Email", data: order.email},
        {header: "Оплата", data: paymentModeText}
    ]

    const address = `г. ${order.city}, ул. ${order.street}, кв. ${order.flat}, индекс: ${order.index}`

    return (
        <div className={"w-full flex flex-col gap-7 py-5 border-b-2 border-second-border-gray"}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                {
                    orderCardData.map((item) => (
                        <div className={"w-[240px] flex flex-col gap-2"}>
                            <Text text={item.header} className={"text-base text-second-gray"}/>
                            <Text text={item.data} className={"text-base text-main-black"}/>
                        </div>
                    ))
                }
            </div>
            <div className={"w-full flex flex-col gap-2"}>
                <Text text={"Способ получения"} className={"text-base text-second-gray"}/>
                <Text text={address} className={"text-base text-main-black"}/>
            </div>
        </div>
    );

};

export default OrderCardContent;
