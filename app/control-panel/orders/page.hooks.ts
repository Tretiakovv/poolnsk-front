import {MultiselectButtonItem} from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useState} from "react";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {OrderStatus} from "@/types/dto/Order";

export const useControlPanelOrderPage = () => {

    const [
        activeOrderFilter,
        setActiveOrderFilter
    ] = useState<string>("ALL")

    const [orders, getOrders] = useStore(
        useShallow(state =>
            [state.orders, state.getOrders])
    )

    const getOrdersQuery = useQuery({
        queryKey : ["get", "orders", activeOrderFilter],
        queryFn : () => getOrders(activeOrderFilter.toLowerCase() as OrderStatus, 0, 5)
    })

    const orderFilterData: MultiselectButtonItem[] = [
        {buttonText: "Все", action: () => setActiveOrderFilter("ALL")},
        {buttonText: "Ожидают подтверждения", action: () => setActiveOrderFilter("IN_PROCESSING")},
        {buttonText: "Активные", action: () => setActiveOrderFilter("ACTIVE")},
        {buttonText: "Завершённые", action: () => setActiveOrderFilter("COMPLETE")},
        {buttonText: "Отменённые", action: () => setActiveOrderFilter("CANCEL")},
    ]

    const [
        activeButtonItem,
        setActiveButtonItem
    ] = useState<MultiselectButtonItem>(orderFilterData[0])

    const handleSelectOrderFilter = (item: MultiselectButtonItem) => setActiveButtonItem(item)

    return {
        activeButtonItem, orderFilterData,
        handleSelectOrderFilter, getOrdersQuery,
        orders
    }

}