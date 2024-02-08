import React from 'react';
import {
    useProductPromotionContent
} from "@/components/organisms/promotion-page/product-promotion-content/ProductPromotionContent.hooks";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import PhotoInput from "@/components/atoms/inputs/photo-input/PhotoInput";
import Button from "@/components/atoms/buttons/button/Button";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";
import {defaultSnackbarState} from "@/types/dto/APIResponseState";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";

const ProductPromotionContent = () => {

    const {...context} = useProductPromotionContent()

    const rowCN = "w-full flex flex-row gap-5 pb-7 border-b-2 border-second-border-gray"

    const inputBlockData = [
        {
            content: [
                {
                    labelText: "Заголовок акции",
                    value: context.headerInput.value,
                    onChange: context.headerInput.onChange,
                    placeholder: "Введите заголовок акции",
                },
                {
                    labelText: "Подзаголовок",
                    value: context.descriptionInput.value,
                    onChange: context.descriptionInput.onChange,
                    placeholder: "Введите подзаголовк акции",
                },
                {
                    labelText: "ID продукта",
                    value: context.idInput.value,
                    onChange: context.idInput.onChange,
                    placeholder: "Введите артикул продукта",
                }
            ]
        },
        {
            content: [
                {
                    labelText: "Название первой характеристики",
                    value: context.firstCharName.value,
                    onChange: context.firstCharName.onChange,
                    placeholder: "Введите название характеристики",
                },
                {
                    labelText: "Описание первой характеристики",
                    value: context.firstCharDescription.value,
                    onChange: context.firstCharDescription.onChange,
                    placeholder: "Опишите характеристику",
                },
            ]
        }, {
            content: [
                {
                    labelText: "Название второй характеристики",
                    value: context.secondCharName.value,
                    onChange: context.secondCharName.onChange,
                    placeholder: "Введите название характеристики",
                },
                {
                    labelText: "Описание второй характеристики",
                    value: context.secondCharDescription.value,
                    onChange: context.secondCharDescription.onChange,
                    placeholder: "Опишите характеристику",
                },
            ]
        }
    ]

    return (
        <>
            <ErrorSnackbar
                message={context.snackbar.state.message}
                isOpen={context.snackbar.state.state === "error"}
                onClose={() => context.snackbar.changeState(defaultSnackbarState)}
            />
            <SuccessSnackbar
                message={context.snackbar.state.message}
                isOpen={context.snackbar.state.state === "success"}
                onClose={() => context.snackbar.changeState(defaultSnackbarState)}
            />
            <div className={"w-full flex flex-col gap-7 pt-7 "}>
                {
                    inputBlockData.map((block, rowIndex) =>
                        <div className={rowCN} key={rowIndex}>
                            {
                                block.content.map((item, itemIndex) =>
                                    <TextInput
                                        labelText={item.labelText}
                                        placeholder={item.placeholder}
                                        onChange={item.onChange}
                                        value={item.value}
                                        key={itemIndex}
                                    />
                                )
                            }
                        </div>
                    )
                }
                <PhotoInput
                    value={context.photoInput.value}
                    onChange={context.photoInput.onChange}
                    onClear={context.photoInput.onClear}
                />
                <Button
                    onClick={context.handleAddPromotion}
                    buttonText={"Добавить"}
                />
            </div>
        </>
    )

};

export default ProductPromotionContent;
