import {useShallow} from "zustand/react/shallow";
import {useStore} from "@/store/store";
import {useQuery} from "react-query";
import {TableItem} from "@/types/TableTypes";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";

export const useWorkersPage = () => {

    const router = useRouter()
    const pathName = usePathname()

    const [workers, getWorkers] = useStore(
        useShallow(state => [state.workers, state.getWorkers])
    )

    const [
        tableWorkers,
        setTableWorkers
    ] = useState<TableItem[]>([])

    const getWorkersQuery = useQuery({
        queryKey : ["get", "workerList"],
        queryFn : getWorkers,
        onSuccess : () => setTableWorkers(mapWorkersToTableItems)
    })

    const mapWorkersToTableItems = () => {
        return workers.map((item, index) => {
            return new Object({
                id: index + 1,
                items : [item.name, item.surname, item.email]
            }) as TableItem
        })
    }

    const handleAddWorker = () => router.push(pathName.concat("/new"))

    return {
        tableWorkers, getWorkersQuery,
        handleAddWorker
    }

}