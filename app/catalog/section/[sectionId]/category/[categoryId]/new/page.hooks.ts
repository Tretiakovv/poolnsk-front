import {useState} from "react";
import {Option} from "@/types/Option";
import {ProductCharacteristic} from "@/types/ProductCharacteristic";
import {DraggableTableItem} from "@/types/TableTypes";
import {useShallow} from "zustand/react/shallow";
import {useStore} from "@/store/store";
import {useMutation, useQuery, useQueryClient} from "react-query";

export const useNewProductPage = (sectionId: number, categoryId: number) => {

    const queryClient = useQueryClient()

    const [
        isCreateSuccess,
        setCreateSuccess
    ] = useState<boolean>(false)

    const [
        isCreateError,
        setCreateError
    ] = useState<boolean>(false)

    const options: Option[] = [
        {name: "ROUBLES", value: "Рубли"},
        {name: "DOLLARS", value: "Доллары"},
        {name: "EURO", value: "Евро"},
    ]

    const [name, setName] = useState<string>("")
    const [info, setInfo] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [saleFlag, setSaleFlag] = useState<boolean>(false)
    const [saleValue, setSaleValue] = useState<string>("")

    const photoNames = useStore(state => state.photoNames)
    const addProduct = useStore(state => state.addProduct)

    const [
        charMap,
        setCharMap
    ] = useState<{ id: number, value: string }[]>([])

    const [
        productChars,
        setProductChars
    ] = useState<ProductCharacteristic[]>([])

    const [
        productCharTableItems,
        setProductCharTableItems
    ] = useState<DraggableTableItem[]>([])

    const handleAddProductCharacteristic = (productChar: ProductCharacteristic) => {
        setProductChars(state => [...state, productChar])
        setProductCharTableItems(state => {
            const newItem: DraggableTableItem = {
                id: productCharTableItems.length,
                orderId: productCharTableItems.length + 1,
                items: [productChar.name, productChar.text]
            }
            return [...state, newItem]
        })
    }

    const handleDeleteProductItem = (itemToDelete: DraggableTableItem) => {
        const preparedTableItems = productCharTableItems.map((item) => {
            if (item.id != itemToDelete.id) {
                return {...item, orderId: item.orderId - 1}
            } else return item
        })
        const filteredTableItems = preparedTableItems.filter((item) => {
            return item.id != itemToDelete.id
        })
        setProductCharTableItems(filteredTableItems)
        setProductChars(state => state.filter((item) => item.name !== itemToDelete.items[0]))
    }

    const handleChangeCharMap = (id: number, newVal: string) => {
        setCharMap((state) => {
            return state.map((item) => {
                if (item.id == id) return {...item, value: newVal}
                else return item
            })
        })
        console.log(charMap)
    }

    const [chars, getChars] = useStore(
        useShallow(state =>
            [state.characteristics, state.getCharacteristics])
    )

    const mapCharToMap = () => {
        const newItems = chars.map((item) => {
            return {id: item.id, value: ""}
        })
        setCharMap(newItems)
    }

    const getCharsQuery = useQuery({
        queryKey: ["get", "chars", categoryId],
        queryFn: () => getChars(categoryId),
        onSuccess: () => mapCharToMap()
    })

    const [
        currency,
        setCurrency
    ] = useState<Option | undefined>(undefined)

    const [
        photos,
        setPhotos
    ] = useState<File[]>([])

    const [
        tableItems,
        setTableItems
    ] = useState<DraggableTableItem[]>([])

    const handleAddPhoto = (photo: File | undefined) => {
        if (photo) {
            setPhotos(state => [...state, photo])
            const tableItem: DraggableTableItem = {
                id: tableItems.length,
                orderId: tableItems.length + 1,
                items: [photo.name]
            }
            setTableItems(state => [...state, tableItem])
        }
    }

    const handleDeletePhoto = (itemToDelete: DraggableTableItem) => {
        const preparedTableItems = tableItems.map((item) => {
            if (item.id != itemToDelete.id) {
                return {...item, orderId: item.orderId - 1}
            } else return item
        })
        const filteredTableItems = preparedTableItems.filter((item) => {
            return item.id != itemToDelete.id
        })
        setTableItems(filteredTableItems)
        setPhotos(state => state.filter((item) => item.name !== itemToDelete.items[0]))
    }

    const addProductMutation = useMutation({
        mutationKey: ["post", "product"],
        mutationFn: (data: any) => addProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["get", "products"])
            setCreateSuccess(true)
        },
        onError: () => setCreateError(true)
    })

    const handleSaveChanges = () => {

        const propertyMap = new Object({})
        charMap.forEach((item) => {
            // @ts-ignore
            propertyMap[item.id.toString()] = item.value
        })

        const extraPropMap = new Object({})
        productChars.forEach((item) => {
            // @ts-ignore
            extraPropMap[item.name] = item.text
        })

        const finalData = {
            categoryId: categoryId,
            name: name,
            price: +price,
            discount: +saleValue,
            propertyMap: propertyMap,
            extraPropertyMap: extraPropMap,
            info: info,
            imageUrlList: photoNames
        }

        addProductMutation.mutate(finalData)

    }

    return {
        name, setName,
        info, setInfo,
        link, setLink,
        price, setPrice,
        saleFlag, setSaleFlag,
        saleValue, setSaleValue,
        currency, setCurrency,
        options, handleSaveChanges,
        handleAddProductCharacteristic,
        tableItems, handleDeletePhoto, handleAddPhoto,
        getCharsQuery, chars, handleChangeCharMap, charMap,
        handleDeleteProductItem, productCharTableItems,
        isCreateSuccess, setCreateSuccess,
        isCreateError, setCreateError
    }

}