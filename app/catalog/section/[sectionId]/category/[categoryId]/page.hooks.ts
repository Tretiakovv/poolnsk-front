import {useState} from "react";
import {ProductShort} from "@/types/dto/Product";
import {prepareSortableItems} from "@/utils/prepareSortableItems";
import {products} from "@/mock/catalogData";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useRouter} from "next/navigation";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

export const useCatalogProductsPage = (sectionId : number, categoryId : number) => {

    const router : AppRouterInstance = useRouter()
    const pathName : string = usePathname()

    const [
        sortableItems,
        setSortableItems
    ] = useState<ProductShort[]>([])

    const [categoryName, setCategoryName] = useState<string>("")

    const [categories, getCategories] = useStore(
        useShallow(state =>
            [state.categories, state.getCategories])
    )

    const findAndSetCategoryName = () => {
        const category = categories.find((category) => category.id == categoryId)
        setCategoryName(category?.name ?? "")
    }

    const [products, getProducts] = useStore(
        useShallow(state =>
            [state.products, state.getProducts])
    )

    const getProductsQuery = useQuery({
        queryKey : ["get", "products", categoryId],
        queryFn : () => getProducts(categoryId),
        onSuccess : () => setSortableItems(prepareSortableItems(products) as ProductShort[])
    })

    const getCategoriesQuery = useQuery({
        queryKey : ["get", "categories", sectionId],
        queryFn : () => getCategories(sectionId),
        onSuccess : () => findAndSetCategoryName()
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setSortableItems((items) => {
                const oldIndex = items.findIndex((item) => item.orderId == active.id);
                const newIndex = items.findIndex((item) => item.orderId == over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const mapItemsToOrderMap = () => {
        const orderMap: Record<string, string> = {}
        sortableItems.forEach((item, index) => orderMap[item.id] = index + 1)
        return orderMap
    }

    const putOrderMap = useStore(state => state.changeProductOrder)
    const handleChangeOrder = () => putOrderMap(mapItemsToOrderMap())

    const handleEditClick = (itemId : number) => console.log("EDIT CLICK")
    const handleDeleteClick = (itemId : number) => console.log("EDIT CLICK")
    const handleAddProduct = () => router.push(pathName.concat("/new"))

    return {
        sortableItems, handleEditClick,
        handleDeleteClick, handleAddProduct,
        getProductsQuery, getCategoriesQuery, categoryName,
        handleDragEnd, handleChangeOrder
    }

}