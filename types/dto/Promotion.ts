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
