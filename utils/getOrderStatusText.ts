import {OrderStatus} from "@/types/dto/Order";

export const getOrderStatusText = (status: OrderStatus) => {
    switch (status) {
        case "ACTIVE":
            return "Активный"
        case "COMPLETE":
            return "Выполненный"
        case "IN_PROCESSING":
            return "Ожидает подтверждения"
        case "CANCEL":
            return "Отменённый"
    }
}