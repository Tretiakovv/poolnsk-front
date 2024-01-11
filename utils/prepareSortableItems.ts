import {Section} from "@/types/dto/Section";

export const prepareSortableItems = (items : any[]) : Section[] => {
    return items.sort((fst, snd) => fst.orderId!! < snd.orderId!! ? -1 : 1)
        .map((item, index) => new Object({...item, orderId : index + 1}) as any)
}