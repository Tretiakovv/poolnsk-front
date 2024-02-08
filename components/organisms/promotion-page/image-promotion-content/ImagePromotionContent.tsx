import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import PhotoInput from "@/components/atoms/inputs/photo-input/PhotoInput";
import Button from "@/components/atoms/buttons/button/Button";
import {
    useImagePromotionContent
} from "@/components/organisms/promotion-page/image-promotion-content/ImagePromotionContent.hooks";
import {defaultSnackbarState} from "@/types/dto/APIResponseState";

const ImagePromotionContent = () => {

    const {...context} = useImagePromotionContent()

    return (
        <>
            <ErrorSnackbar
                message={context.snackbar.snackbarState.message}
                isOpen={context.snackbar.snackbarState.state === "error"}
                onClose={() => context.snackbar.changeSnackbarState(defaultSnackbarState)}
            />
            <SuccessSnackbar
                message={context.snackbar.snackbarState.message}
                isOpen={context.snackbar.snackbarState.state === "success"}
                onClose={() => context.snackbar.changeSnackbarState(defaultSnackbarState)}
            />
            <div className={"py-7 w-full flex flex-col gap-7"}>
                <div className={"w-full flex flex-row items-start gap-5"}>
                    <TextInput
                        value={context.textInput.pageLink}
                        placeholder={"Вставьте ссылку на товар"}
                        onChange={context.textInput.setPageLink}
                        labelText={"Ссылка на страницу"}
                    />
                    <PhotoInput
                        value={context.fileInput.image}
                        onChange={context.fileInput.handleChangeImage}
                        onClear={context.fileInput.handleClearImage}
                        hintText={"Фотография должна быть размером 1280 на 300 px"}
                        labelText={"Фотография"}
                    />
                </div>
                <Button
                    buttonText={"Добавить"}
                    onClick={context.handleAddPromotion}
                />
            </div>
        </>
    )
}

export default ImagePromotionContent