export type Request = {
    id: number,
    creationDate: string,
    name: string,
    email: string,
    phoneNumber: string | null,
    applicationType: RequestType,
    message: "Это мой комментарий к заявке на вопрос (связаться с нами/расчет)",
    serviceType: null,
    isProcessed: false
}

export type RequestType = "question" | "call" | "service"