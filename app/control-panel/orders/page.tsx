"use client"

import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useControlPanelOrderPage} from "@/app/control-panel/orders/page.hooks";
import OrderList from "@/components/organisms/order-list/OrderList";

const ControlPanelOrdersPage = () => {

    const context = useControlPanelOrderPage()

    if (context.getOrdersQuery.isLoading) {
        return (
            <div>
                Orders is loading..
            </div>
        )
    }

    if (context.getOrdersQuery.isSuccess) {
        return (
            <div className={"w-full gap-[30px] py-[30px] flex flex-col"}>
                <MultiselectButton
                    items={context.orderFilterData}
                    activeItem={context.activeButtonItem}
                    setActiveItem={context.handleSelectOrderFilter}
                />
                <OrderList orders={context.orders}/>
            </div>
        );
    }

};

export default ControlPanelOrdersPage;
