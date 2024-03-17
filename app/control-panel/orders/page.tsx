"use client"

import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useControlPanelOrderPage} from "@/app/control-panel/orders/page.hooks";
import dynamic from "next/dynamic";
import Loading from "@/components/atoms/loading/Loading";

const OrderList = dynamic(
    () => import("@/components/organisms/order-list/OrderList"),
    {loading : () => <Loading/>})

const ControlPanelOrdersPage = () => {

    const context = useControlPanelOrderPage()

    if (context.getOrdersQuery.isSuccess) {
        return (
            <div className={"w-full gap-[30px] py-[30px] flex flex-col"}>
                <MultiselectButton
                    items={context.orderFilterData}
                    activeItem={context.activeButtonItem}
                    setActiveItem={context.handleSelectOrderFilter}
                />
                <OrderList
                    orders={context.orders}
                    curOrderStatus={context.activeOrderFilter}
                />
            </div>
        );
    }

};

export default ControlPanelOrdersPage;
