import {OrderStatus} from "@/types/dto/Order";

export const getOrderStatusText = (status: OrderStatus) => {
    switch (status as string) {
        case "ACTIVE":
            return "Активный"
        case "COMPLETE":
            return "Выполненный"
        case "IN_PROCESSING":
            return "Ожидает подтверждения"
        case "CANCELLED":
            return "Отменённый"
    }
}