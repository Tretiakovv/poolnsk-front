import { ValueType } from "../ValueType"

export type CategoryFull = {
    id : number,
    name : string,
    orderId : number,
    notToDeleteFlag : boolean,
    topPropertiesIdList : ProductProperty[],
    properties : ProductProperty[],
    products : Product[]
}

export type ProductProperty = {
    id : number,
    name : string,
    valueType : ValueType
}

export type Product = {
    id : number,
    name : string,
    orderId : number,
    price : number,
    discount : number,
    deleted : boolean,
    filledProperties : FilledProperty[],
    extraPropertyList : ExtraProperty[],
    info : string,
    photoList : string[]
}

export type FilledProperty = {
    id : number,
    property : ProductProperty,
    value : number | string
}

export type ExtraProperty = {
    id : number,
    name : string,
    value : number | string
}

export type ProductShort = {
    id : number,
    orderId : number,
    name : string,
    price : number
}