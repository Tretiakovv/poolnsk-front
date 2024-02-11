import {useState} from "react";
import {Option} from "@/types/Option";
import {ProductCharacteristic} from "@/types/ProductCharacteristic";
import {DraggableTableItem} from "@/types/TableTypes";
import {useShallow} from "zustand/react/shallow";
import {useStore} from "@/store/store";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Product} from "@/types/dto/Product";
import {ResponseChar} from "@/types/ResponseChar";

export const useProductPage = (categoryId: number, defaultProduct ?: Product) => {

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

    const defaultPrice = (defaultProduct?.discount !== 0) ?? false

    const [name, setName] = useState<string>(defaultProduct?.name ?? "")
    const [info, setInfo] = useState<string>(defaultProduct?.info ?? "")
    const [link, setLink] = useState<string>("")
    const [price, setPrice] = useState<string>(String(defaultProduct?.price ?? ""))
    const [saleFlag, setSaleFlag] = useState<boolean>(defaultPrice)
    const [saleValue, setSaleValue] = useState<string>(String(defaultProduct?.discount ?? ""))

    const addProduct = useStore(state => state.addProduct)

    const [
        charMap,
        setCharMap
    ] = useState<{ id: number, value: string }[]>([])

    const [
        productChars,
        setProductChars
    ] = useState<ProductCharacteristic[]>([])

    const mapExtraPropertiesToTableItems = () : DraggableTableItem[] => {
        console.log(defaultProduct)
        if (!defaultProduct) return []
        else {
            const draggableItems : DraggableTableItem[] = defaultProduct.extraPropertyList.map((extraProperty, index) => {
                return {
                    id: index, orderId: index + 1,
                    items: Object.values(extraProperty)
                } as DraggableTableItem
            })
            console.log(draggableItems)
            return draggableItems
        }
    }

    const [
        productCharTableItems,
        setProductCharTableItems
    ] = useState<DraggableTableItem[]>(mapExtraPropertiesToTableItems)

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
        const mapFn = (item : ResponseChar) => {return {id: item.id, value: "" }}
        const newItems = defaultProduct ? defaultProduct.propertyMap : chars.map(mapFn)
        setCharMap(newItems)
    }

    const getCharsQuery = useQuery({
        queryKey: ["get", "chars", categoryId],
        queryFn: () => getChars(categoryId),
        onSuccess: () => mapCharToMap(),
        refetchOnWindowFocus: false
    })

    const [
        currency,
        setCurrency
    ] = useState<Option | undefined>(undefined)

    const [images, downloadImage] = useStore(
        useShallow(state => [state.files, state.downloadImage])
    )

    const downloadImages = () => {
        if (defaultProduct?.imageUrlList.length === 0) return
        else {
            const imageUrlList = defaultProduct?.imageUrlList!!
            imageUrlList.forEach(uuid => downloadImage(uuid))
        }
    }

    const [
        photos,
        setPhotos
    ] = useState<File[]>([])

    const [
        UUID_photos,
        setUUID_photos
    ] = useState<string[]>(defaultProduct?.imageUrlList ?? [])

    const uploadImage = useStore(state => state.uploadImage)
    const uploadImageMutation = useMutation({
        //@ts-ignore
        mutationKey: ["post", "image"],
        mutationFn: uploadImage,
        onSuccess: (UUID_photo: string) => setUUID_photos(state => [...state, UUID_photo])
    })

    const [
        tableItems,
        setTableItems
    ] = useState<DraggableTableItem[]>([])

    const handleAddPhoto = (photo: File) => {
        if (photo) {
            setPhotos(state => [...state, photo])
            const tableItem: DraggableTableItem = {
                id: tableItems.length,
                orderId: tableItems.length + 1,
                items: [photo.name]
            }
            setTableItems(state => [...state, tableItem])
            uploadImageMutation.mutate(photo)
        }
    }

    const handleDeletePhoto = (itemToDelete: DraggableTableItem, indexToDelete: number) => {
        const preparedTableItems = tableItems.map((item) => {
            if (item.id != itemToDelete.id) {
                return {...item, orderId: item.orderId - 1}
            } else return item
        })
        const filteredTableItems = preparedTableItems.filter((item) => {
            return item.id != itemToDelete.id
        })
        setTableItems(filteredTableItems)
        setUUID_photos(state => state.filter((_, index) => index !== indexToDelete))
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
            imageUrlList: UUID_photos
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