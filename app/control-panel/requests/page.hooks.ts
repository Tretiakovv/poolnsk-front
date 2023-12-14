import {useState} from "react";
import {MultiselectButtonItem} from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "react-query";
import {RequestType} from "@/types/dto/Request";
import {TableItem} from "@/types/TableTypes";

export const useControlPanelRequestsPage = () => {

    const [
        activeRequestType,
        setActiveRequestType
    ] = useState<RequestType>("call")

    const [
        activeProcessedFilter,
        setActiveProcessedFilter
    ] = useState<boolean>(true)

    const requestTypeData: MultiselectButtonItem[] = [
        {
            buttonText: "Звонки",
            action : () => setActiveRequestType("call")
        },
        {
            buttonText: "Вопросы и расчёт",
            action : () => setActiveRequestType("question")
        },
        {
            buttonText: "Услуги",
            action : () => setActiveRequestType("service")
        }
    ]

    const requestFilterData: MultiselectButtonItem[] = [
        {
            buttonText : "Все",
            action : () => setActiveProcessedFilter(true)
        },
        {
            buttonText : "Обработаны",
            action : () => setActiveProcessedFilter(true)
        },
        {
            buttonText : "Не обработаны",
            action : () => setActiveProcessedFilter(false)
        },
    ]

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
            return new Object({
                id : item.id,
                items : [item.name, item.phoneNumber, item.creationDate.slice(0,10)]
            }) as TableItem
        })
    }

    const getRequestsQuery = useQuery({
        queryKey : ["get", "requestList", activeRequestType, activeProcessedFilter],
        queryFn : () => getRequests(activeRequestType, activeProcessedFilter),
        onSuccess : () => setRequestTableItems(mapRequestsToTableItems)
    })


    return {
        requestTableItems, getRequestsQuery,
        requestTypeData, requestFilterData,
        activeTypeItem, setActiveTypeItem,
        activeFilterItem, setActiveFilterItem
    }

}