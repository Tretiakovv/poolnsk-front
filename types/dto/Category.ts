export type Category = {
    id : number,
    name : string,
    notToDeleteFlag : boolean | null,
    properties : CategoryProperty[],
    orderId : number | null
}

export type CategoryProperty = {
    id : number,
    name : string,
    valueType : "STRING" | "INTEGER" | "FLOAT",
    categoryId : number | null,
    top : boolean,
    value : any
}