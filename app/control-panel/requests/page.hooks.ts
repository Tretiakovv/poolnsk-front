import {useState} from "react";
import {MultiselectButtonItem} from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {RequestType} from "@/types/dto/Request";
import {TableItem} from "@/types/TableTypes";
import {TextLinkItem} from "@/types/TextLinkItem";

export const useControlPanelRequestsPage = () => {

    const [
        activeRequestType,
        setActiveRequestType
    ] = useState<RequestType>("call")

    const [
        activeProcessedFilter,
        setActiveProcessedFilter
    ] = useState<boolean | null>(null)

    const requestTypeData: MultiselectButtonItem[] = [
        {
            buttonText: "Звонки",
            action: () => setActiveRequestType("call")
        },
        {
            buttonText: "Вопросы и расчёт",
            action: () => setActiveRequestType("question")
        },
        {
            buttonText: "Услуги",
            action: () => setActiveRequestType("service")
        }
    ]

    const requestFilterData: MultiselectButtonItem[] = [
        {
            buttonText: "Все",
            action: () => setActiveProcessedFilter(null)
        },
        {
            buttonText: "Обработаны",
            action: () => setActiveProcessedFilter(true)
        },
        {
            buttonText: "Не обработаны",
            action: () => setActiveProcessedFilter(false)
        },
    ]

    const itemWidth = activeRequestType === "call"
        ? "w-[280px]" : activeRequestType === "question" ? "w-[207px]"
            : "w-[162px]"

    const [
        activeTypeItem,
        setActiveTypeItem
    ] = useState<MultiselectButtonItem>(requestTypeData[0])

    const [
        activeFilterItem,
        setActiveFilterItem
    ] = useState<MultiselectButtonItem>(requestFilterData[0])

    const [
        requestTableItems,
        setRequestTableItems
    ] = useState<TableItem[]>([])

    const [requests, getRequests] = useStore(
        useShallow(state =>
            [state.requests, state.getRequests])
    )

    const mapRequestsToTableItems = () => {
        return requests.map((item) => {

            const itemData: (string | TextLinkItem)[] = [
                item.name, item.phoneNumber ?? "—", item.creationDate.slice(0, 10)
            ]

            switch (item.applicationType.toLowerCase()) {
                case "question":
                    itemData.push({text: item.message, link: ""} as TextLinkItem)
                    break
                case "service" :
                    itemData.push(item.serviceType)
            }

            return new Object({
                id: item.id,
                items: itemData
            }) as TableItem

        })
    }

    const getRequestsQuery = useQuery({
        queryKey: ["get", "requestList", activeProcessedFilter],
        queryFn: () => getRequests(activeRequestType, activeProcessedFilter),
        onSuccess: () => setRequestTableItems(mapRequestsToTableItems)
    })


    return {
        activeRequestType, itemWidth, requests,
        requestTableItems, getRequestsQuery,
        requestTypeData, requestFilterData,
        activeTypeItem, setActiveTypeItem,
        activeFilterItem, setActiveFilterItem
    }

}