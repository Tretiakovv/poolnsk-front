import {useStore} from "@/store/store";
import {OrderStatus} from "@/types/dto/Order";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";

export const useOrderCardHeaderRow = (orderId : number, curOrderSatus : OrderStatus) => {

    const queryClient = useQueryClient()

    const changeOrderStatus = useStore(state => state.changeOrderStatus)

    const [
        orderStatus,
        setOrderStatus
    ] = useState<"NONE" | OrderStatus>("NONE")

    const changeOrderStatusMutation = useMutation({
        mutationKey : ["put", "orderStatus", orderId, orderStatus],
        mutationFn : (orderStatus : OrderStatus) => changeOrderStatus(orderId, orderStatus),
        onSuccess : () => queryClient.invalidateQueries({
            queryKey : ["get", "orders", curOrderSatus]
        }),
    })

    const handleRejectOrder = () => setOrderStatus("CANCEL")
    const handleAcceptOrder = () => {
        setOrderStatus("ACTIVE")
        changeOrderStatusMutation.mutate("ACTIVE")
    }
    const handleCloseOrder = () => setOrderStatus("COMPLETE")

    const onPopupRejectOrder = () => changeOrderStatusMutation.mutate("CANCEL")
    const onPopupCloseOrder = () => changeOrderStatusMutation.mutate("COMPLETE")
    const onPopupClose = () => setOrderStatus("NONE")

    return {
        handleRejectOrder, handleAcceptOrder, orderStatus, onPopupClose,
        handleCloseOrder, onPopupCloseOrder, onPopupRejectOrder
    }

}