export type Project = {
    id: number,
    orderId: number,
    name: string,
    workType: string,
    terms: string,
    imageFilenameList: string[],
    workProperties: WorkProperty[]
}

export type WorkProperty = {
    id : number,
    filename : string,
    name : string,
    info : string
}
