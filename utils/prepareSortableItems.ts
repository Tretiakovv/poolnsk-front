import {Section} from "@/types/dto/Section";

export const prepareSortableItems = (items : any[]) : Section[] => {
    return items.map((item, index) => {
        return new Object({...item, orderId : index + 1}) as any
    })
}