import {useState} from "react";
import {Characteristic} from "@/types/Characteristic";
import {DraggableTableItem} from "@/types/TableTypes";
import {useStore} from "@/store/store";
import {useMutation, useQueryClient} from "react-query";

export const useNewCategoryPage = (sectionId : number) => {

    const queryClient = useQueryClient()

    const [
        isCreateError,
        setCreateError
    ] = useState<boolean>(false)

    const [
        isSnackbarOpen,
        setSnackbarOpen
    ] = useState<boolean>(false)

    const [name, setName] = useState<string>("")

    const [
        chars,
        setChars
    ] = useState<Characteristic[]>([])

    const [
        tableItems,
        setTableItems
    ] = useState<DraggableTableItem[]>([])

    const addCategory = useStore(state => state.addCategory)

    const handleAddCharacteristic = (characteristic : Characteristic) => {
        const tableItem = {
            id : tableItems.length, orderId : tableItems.length + 1,
            items : [characteristic.isTop ? "Да" : "Нет", characteristic.name, characteristic.valueType]
        } as DraggableTableItem
        setTableItems(state => [...state, tableItem])
        setChars(state => [...state, characteristic])
    }

    const handleDeleteCharacteristic = (itemToDelete : DraggableTableItem) => {
        const preparedItems = tableItems.map(item => {
            if (item.orderId !== itemToDelete.orderId) return {...item, id : item.id - 1, orderId : item.orderId - 1}
            return item
        })
        const filteredItems = preparedItems.filter((item) => item.orderId !== itemToDelete.orderId)
        const filteredChars = chars.filter((item) => item.name !== itemToDelete.items[1])
        setChars(filteredChars)
        setTableItems(filteredItems)
    }

    const addCategoryMutation = useMutation({
        mutationKey : ["post", "category"],
        mutationFn : () => addCategory(sectionId, name, chars),
        onSuccess : () => {
            queryClient.invalidateQueries(["get", "categoryList"])
            setSnackbarOpen(true)
        },
        onError : () => setCreateError(true)
    })

    const handleSaveChanges = () => {
        addCategoryMutation.mutate()
    }

    return {
        name, setName, tableItems, handleAddCharacteristic,
        handleSaveChanges, handleDeleteCharacteristic,
        isSnackbarOpen, setSnackbarOpen, isCreateError, setCreateError
    }

}