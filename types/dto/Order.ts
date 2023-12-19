export type Order = {
    id : number,
    creationDate: string,
    status: OrderStatus,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    city: string,
    street: string,
    house: string,
    flat: string,
    index: string,
    paymentCompleted: boolean,
    paymentMode: OrderPaymentMode,
    productMap: Record<string, number>
}

export type OrderStatus = "IN_PROCESSING" | "CANCEL" | "ACTIVE" | "COMPLETE"
export type OrderPaymentMode = "ONLINE" | "OFFLINE"