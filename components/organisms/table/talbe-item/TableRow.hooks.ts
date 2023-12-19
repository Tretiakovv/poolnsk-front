import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import {useMutation, useQueryClient} from "react-query";

export const useTableRow = (requestId : number) => {

    const queryClient = useQueryClient()

    const [markRequestProcessed, markRequestNotProcessed] = useStore(
        useShallow(state => [
            state.markRequestProcessed, state.markRequestNotProcessed
        ])
    )

    const markRequestProcessedQuery = useMutation({
        mutationKey : ["put", "processRequest", requestId],
        mutationFn : () => markRequestProcessed(requestId),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["get", "requestList", false]})
            queryClient.invalidateQueries({queryKey : ["get", "requestList", null]})
        }
    })

    const markRequestNotProcessedQuery = useMutation({
        mutationKey : ["put", "notProcessRequest", requestId],
        mutationFn : () => markRequestNotProcessed(requestId),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["get", "requestList", true]})
            queryClient.invalidateQueries({queryKey : ["get", "requestList", null]})
        }
    })

    const handleProcessClick = () => markRequestProcessedQuery.mutate()
    const handleNotProcessClick = () => markRequestNotProcessedQuery.mutate()

    return {
        handleProcessClick, handleNotProcessClick
    }

}