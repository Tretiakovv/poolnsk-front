import {ChangeEvent, useState} from "react";
import {useStore} from "@/store/store";
import {useMutation} from "react-query";
import {defaultSnackbarState, SnackbarState} from "@/types/dto/APIResponseState";
import {ReqProductPromotion} from "@/types/dto/Promotion";

export const useProductPromotionContent = () => {

    const [snackbarState, setSnackbarState] = useState<SnackbarState>(defaultSnackbarState)

    const [promoHeader, setPromoHeader] = useState<string>("")
    const [promoDescription, setPromoDescription] = useState<string>("")
    const [promoId, setPromoId] = useState<string>("")

    const [firstCharHeader, setFirstCharHeader] = useState<string>("")
    const [firstCharDescription, setFirstCharDescription] = useState<string>("")

    const [secondCharHeader, setSecondCharHeader] = useState<string>("")
    const [secondCharDescription, setSecondCharDescription] = useState<string>("")

    const [promoImage, setPromoImage] = useState<File>()
    const handleClearImage = () => setPromoImage(undefined)
    const handleChangeImage = (event : ChangeEvent<HTMLInputElement>) => {
        event.target?.files && setPromoImage(event.target.files[0])
    }

    const createProductPromotion = (fileName : string) => {
        return {
            productId: +promoId,
            firstPropertyName: firstCharHeader,
            firstPropertyValue: firstCharDescription,
            secondPropertyName: secondCharHeader,
            secondPropertyValue: secondCharDescription,
            title: promoHeader,
            subtitle: promoDescription,
            imageUrl: fileName
        } as ReqProductPromotion
    }

    const addProductPromotion = useStore(state => state.addProductPromotion)
    const addProductPromotionMutation = useMutation({
        mutationKey : ["post", "productPromotion"],
        mutationFn : (fileName : string) => addProductPromotion(createProductPromotion(fileName)),
        onSuccess : () => setSnackbarState({state : "success", message : "Акция-товар успешно создана!"}),
        onError : () => setSnackbarState({state : "error", message : "Возникла ошибка при создании акции. Попробуйте ещё раз"})
    })

    const uploadImage = useStore(state => state.uploadImage)
    const uploadImageMutation = useMutation({
        //@ts-ignore
        mutationKey : ["post", "promoImage"],
        mutationFn : () => promoImage && uploadImage(promoImage),
        onSuccess : (fileName : string) => addProductPromotionMutation.mutate(fileName),
        onError : () => setSnackbarState({state : "error", message : "Размер фотографии слишком большой."})
    })

    const handleAddPromotion = () => uploadImageMutation.mutate()

    return {
        headerInput : {value : promoHeader, onChange : setPromoHeader},
        descriptionInput : {value : promoDescription, onChange : setPromoDescription},
        idInput : {value : promoId, onChange : setPromoId},
        firstCharName : {value : firstCharHeader, onChange : setFirstCharHeader},
        firstCharDescription : {value : firstCharDescription, onChange : setFirstCharDescription},
        secondCharName : {value : secondCharHeader, onChange : setSecondCharHeader},
        secondCharDescription : {value : secondCharDescription, onChange : setSecondCharDescription},
        photoInput : {value : promoImage, onChange : handleChangeImage, onClear : handleClearImage},
        snackbar : {state : snackbarState, changeState : setSnackbarState},
        handleAddPromotion
    }

}