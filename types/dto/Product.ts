
export type ProductProperty = {
    id : number,
    value : string
}

export type ExtraProductProperty = {
    propertyName : string,
    value : string
}

export type Product = {
    id : number,
    name : string,
    vendor : string,
    orderId ?: number,
    price : number,
    discount : number,
    deleted : boolean,
    propertyMap : ProductProperty[],
    extraPropertyMap : ExtraProductProperty[],
    info : string,
    imageUrlList : string[]
}

export type ProductShort = {
    id : number,
    orderId : number,
    name : string,
    price : number
}