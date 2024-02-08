export type Promotion = {
    id: number,
    orderId: number,
    createdByPhoto: boolean,
    productId: number,
    link: string,
    title: string,
    subtitle: string,
    properties: Map<string, string>,
    price: number,
    discount: number,
    imageUrl: string
}

export type ReqImagePromotion = {
    link : string,
    imageUrl : string
}

export type ReqProductPromotion = {
    productId: number,
    firstPropertyName: string,
    firstPropertyValue: string,
    secondPropertyName: string,
    secondPropertyValue: string,
    title: string,
    subtitle: string,
    imageUrl: string
}

