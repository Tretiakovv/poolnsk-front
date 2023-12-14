export type Order = {
    type : OrderType
}

export type OrderType = "in_processing" | "cancel" | "active" | "complete" | "all"