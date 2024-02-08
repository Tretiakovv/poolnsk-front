import {ChangeEvent, useState} from "react";
import {defaultSnackbarState, SnackbarState} from "@/types/dto/APIResponseState";
import {ReqImagePromotion} from "@/types/dto/Promotion";
import {useStore} from "@/store/store";
import {useMutation} from "react-query";

export const useImagePromotionContent = () => {

    const [
        snackbarState,
        changeSnackbarState
    ] = useState<SnackbarState>(defaultSnackbarState)

    const [pageLink, setPageLink] = useState<string>("")
    const [image, setImage] = useState<File>()

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        event.target?.files && setImage(event.target.files[0])
    }
    const handleClearImage = () => setImage(undefined)

    const createImagePromotion = (imageUrl : string) => {
        return {link: pageLink, imageUrl: imageUrl} as ReqImagePromotion
    }

    const addImagePromotion = useStore(state => state.addImagePromotion)
    const uploadImage = useStore(state => state.uploadImage)

    const addImagePromotionMutation = useMutation({
        //@ts-ignore
        mutationKey: ["post", "imagePromotion"],
        mutationFn: (imageUrl : string) => addImagePromotion(createImagePromotion(imageUrl)),
        onSuccess: () => changeSnackbarState({state : "success", message : "Создание акции-картинки прошло успешно!"}),
        onError: () => changeSnackbarState({state : "error", message : "Возникли ошибки при создании акции-картинки. Попробуйте ещё раз"})
    })

    const uploadImageMutation = useMutation({
        //@ts-ignore
        mutationKey: ["post", "image"],
        mutationFn: () => image && uploadImage(image),
        onSuccess : (fileName : string) => addImagePromotionMutation.mutate(fileName),
        onError : () => changeSnackbarState({state : "error", message : "Размер фотографии слишком большой."})
    })

    const handleAddPromotion = () => uploadImageMutation.mutate()

    return {
        textInput: {pageLink, setPageLink},
        fileInput: {image, handleChangeImage, handleClearImage},
        snackbar: {snackbarState, changeSnackbarState},
        handleAddPromotion,
    }

}