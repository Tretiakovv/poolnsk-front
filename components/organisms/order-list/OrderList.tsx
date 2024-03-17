import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {Order, OrderStatus} from "@/types/dto/Order";

const OrderList = ({orders, curOrderStatus}: {
    orders: Order[],
    curOrderStatus: OrderStatus
}) => {
    return (
        <div className={"flex flex-col gap-[20px]"}>
            {
                orders.map((order, index) => (
                    <OrderCard
                        order={order} key={index}
                        curOrderStatus={curOrderStatus}
                    />
                ))
            }
        </div>
    );
};

export default OrderList;
