import {useStore} from "@/store/store";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";
import {Option} from "@/types/Option";
import {ProductCharacteristic} from "@/types/ProductCharacteristic";
import {TableItem} from "@/types/TableTypes";

export const useEditProductPage = (categoryId: number, productId: number) => {

    const queryClient = useQueryClient()

    const [product, getProduct] = useStore(
        useShallow(state => [state.product, state.getProduct])
    )

    const getProductQuery = useQuery({
        queryKey: ["get", "product", productId],
        queryFn: () => getProduct(productId),
        onSuccess: () => {
            mapExtraPropertiesToTableItems()
            setVendor(product.vendor)
            setName(product.name)
            setInfo(product.info)
            setCharMap(product.propertyMap)
            setActiveOption(getActiveOption)
            setPrice(String(product.currencyPrice))
            setSaleFlag(product.discount !== 0)
            setSaleValue(product.discount === 0 ? "" : String(product.discount))
            product.imageUrlList.forEach((uuid) => {
                    setUUID_photos(state => [...state, uuid])
                    downloadImage(uuid).then(file => handleAddPhoto(file, false))
                }
            )
        },
        refetchOnWindowFocus: false
    })

    const getActiveOption = () => {
        switch (product.currencyType) {
            case "RUB" : return options[0]
            case "USD" : return options[1]
            case "EUR" : return options[2]
        }
    }

    const [
        isCreateSuccess,
        setCreateSuccess
    ] = useState<boolean>(false)

    const [
        isCreateError,
        setCreateError
    ] = useState<boolean>(false)

    const options: Option[] = [
        {name: "RUB", value: "Рубли"},
        {name: "USD", value: "Доллары"},
        {name: "EUR", value: "Евро"},
    ]

    const [activeOption, setActiveOption] = useState<Option>(options[0])

    const [name, setName] = useState<string>("")
    const [info, setInfo] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [vendor, setVendor] = useState<string>("")
    const [saleFlag, setSaleFlag] = useState<boolean>(false)
    const [saleValue, setSaleValue] = useState<string>("")

    const editProduct = useStore(state => state.editProduct)

    const [
        charMap,
        setCharMap
    ] = useState<{ id: number, value: string }[]>([])

    const [
        productChars,
        setProductChars
    ] = useState<ProductCharacteristic[]>([])

    const mapExtraPropertiesToTableItems = () => {
        product.extraPropertyMap.map((extraProperty, index) => {
            handleAddProductCharacteristic({name: extraProperty.propertyName, text: extraProperty.value}, index)
        })
    }

    const [
        productCharTableItems,
        setProductCharTableItems
    ] = useState<TableItem[]>([])

    const handleAddProductCharacteristic = (productChar: ProductCharacteristic, index ?: number) => {
        setProductChars(state => [...state, productChar])
        setProductCharTableItems(state => {
            const newItem: TableItem = {
                id: index ?? productCharTableItems.length,
                items: [productChar.name, productChar.text]
            }
            return [...state, newItem]
        })
    }

    const handleDeleteProductItem = (itemToDelete: TableItem) => {
        setProductCharTableItems(state => state.filter(item => item.id != itemToDelete.id))
        setProductChars(state => state.filter((item) => item.name !== itemToDelete.items[0]))
    }

    const handleChangeCharMap = (id: number, newVal: string) => {
        setCharMap((state) => {
            return state.map((item) => {
                if (item.id == id) return {...item, value: newVal}
                else return item
            })
        })
    }

    const [chars, getChars] = useStore(
        useShallow(state =>
            [state.characteristics, state.getCharacteristics])
    )

    const getCharsQuery = useQuery({
        queryKey: ["get", "chars", categoryId],
        queryFn: () => getChars(categoryId),
        refetchOnWindowFocus: false
    })

    const [
        currency,
        setCurrency
    ] = useState<Option | undefined>(undefined)

    const [images, downloadImage] = useStore(
        useShallow(state => [state.files, state.downloadImage])
    )

    const [
        photos,
        setPhotos
    ] = useState<File[]>([])

    const [
        UUID_photos,
        setUUID_photos
    ] = useState<string[]>([])

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
    ] = useState<TableItem[]>([])

    const handleAddPhoto = (photo: File, shouldMutate: boolean = true) => {
        setPhotos(state => [...state, photo])
        const tableItem: TableItem = {
            id: tableItems.length,
            items: [photo.name]
        }
        setTableItems(state => [...state, tableItem])
        if (shouldMutate) uploadImageMutation.mutate(photo)
    }

    const handleDeletePhoto = (itemToDelete: TableItem) => {
        const nameToDelete = itemToDelete.items[0] as string
        setTableItems(state => state.filter(item => item.items[0] !== itemToDelete.items[0]))
        setUUID_photos(state => state.filter(item => !item.includes(nameToDelete)))
        setPhotos(state => state.filter((item) => item.name !== itemToDelete.items[0]))
    }

    const editProductMutation = useMutation({
        mutationKey: ["edit", "product"],
        mutationFn: (data: any) => editProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["get", "products"])
            setCreateSuccess(true)
        },
        onError: () => setCreateError(true)
    })

    const handleSaveChanges = () => {

        const propertyMap = {}
        charMap.forEach((item) => {
            // @ts-ignore
            propertyMap[item.id.toString()] = item.value
        })

        const extraPropMap = {}
        productChars.forEach((item) => {
            // @ts-ignore
            extraPropMap[item.name] = item.text
        })

        const finalData = {
            id: product.id,
            vendor : vendor,
            name: name,
            currencyPrice: +price,
            currencyType : activeOption.name,
            discount: +saleValue,
            propertyMap: propertyMap,
            extraPropertyMap: extraPropMap,
            info: info,
            imageUrlList: UUID_photos
        }

        editProductMutation.mutate(finalData)

    }

    return {
        activeOption, setActiveOption,
        getProductQuery, product,
        vendor, setVendor,
        name, setName, info, setInfo,
        link, setLink, price, setPrice,
        saleFlag, setSaleFlag, saleValue, setSaleValue,
        currency, setCurrency, options, handleSaveChanges,
        handleAddProductCharacteristic, tableItems, handleDeletePhoto,
        handleAddPhoto, getCharsQuery, chars, handleChangeCharMap, charMap,
        handleDeleteProductItem, productCharTableItems,
        isCreateSuccess, setCreateSuccess,
        isCreateError, setCreateError, images
    }

}