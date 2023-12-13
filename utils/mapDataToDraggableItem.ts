import {DraggableTableItem} from "@/types/TableTypes";

export const mapDataToDraggableItem = (data : any[], items : string[]) => {
    return data.map((item) => {
        return new Object({
            orderId: item.orderId,
            items: items,
            id: item.id,
        }) as DraggableTableItem
    })
}