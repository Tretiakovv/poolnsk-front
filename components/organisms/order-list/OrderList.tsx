import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {Order} from "@/types/dto/Order";

const OrderList = ({orders}: {
    orders: Order[]
}) => {
    return (
        <div className={"flex flex-col gap-[20px]"}>
            {
                orders.map((order) => (
                    <OrderCard order={order}/>
                ))
            }
        </div>
    );
};

export default OrderList;
