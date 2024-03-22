"use client"

import {useProductPage} from "@/app/catalog/section/[sectionId]/category/[categoryId]/new/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import Button from "@/components/atoms/buttons/button/Button";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import Text from "@/components/atoms/text/Text";
import Checkbox from "@/components/atoms/inputs/checkbox/Checkbox";
import {TextItem} from "@/types/TextItem";
import React from "react";
import PhotoBlock from "@/components/organisms/blocks/photo-block/PhotoBlock";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import CategoryCharacteristicRow
    from "@/components/organisms/rows/category-characteristic-row/CategoryCharacteristicRow";
import ActionButton from "@/components/atoms/buttons/delete-button/ActionButton";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar"
import TextArea from "@/components/atoms/inputs/text-area/TextArea";
import ProductCharacteristicBlock
    from "@/components/organisms/blocks/product-characteristic-block/ProductCharacteristicBlock";
import ProductHelperBottomRow from "@/components/organisms/rows/product-helper-bottom-row/ProductHelperBottomRow";

const helperHintRow: TextItem[] = [
    {text: "Дополнительная характеристика товара"},
    {text: "Текст характеристики"},
]

const NewProductPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const context = useProductPage(params.categoryId)

    if (context.getCharsQuery.isLoading) {
        return (
            <div>
                Page is loading..
            </div>
        )
    }

    if (context.getCharsQuery.isSuccess) return (
        <>
            <ErrorSnackbar
                message={"Возникла ошибка при создании товара. Попробуйте снова."}
                isOpen={context.isCreateError}
                onClose={() => context.setCreateError(false)}
            />
            <SuccessSnackbar
                message={"Товар был создан успешно! Вы можете вернуться назад."}
                isOpen={context.isCreateSuccess}
                onClose={() => context.setCreateSuccess(false)}
            />
            <HeaderRow
                header={"Новый товар"}
                backIcon
            />
            <div className={"w-full flex flex-col gap-[30px] py-[30px]"}>

                <div className={"w-full flex flex-row gap-5 pb-10 border-b-2 border-second-light-blue"}>
                    <TextInput
                        value={context.name}
                        labelText={"Название товара"}
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        maxLength={110}
                        placeholder={"Введите здесь.."}
                        onChange={context.setName}
                    />
                    <TextInput
                        disabled
                        value={context.link}
                        labelText={"Ссылка на товар конкурента"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setLink}
                    />
                    <TextArea
                        value={context.info}
                        labelText={"Описание товара"}
                        hintText={"Не больше 330 символов, включая пробелы и знаки препинания"}
                        maxLength={330}
                        placeholder={"Введите здесь.."}
                        onChange={context.setInfo}
                    />

                </div>

                <div className={"w-full flex flex-row gap-5 pb-10 border-b-2 border-second-light-blue"}>

                    <TextInput
                        value={context.price}
                        labelText={"Цена товара"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setPrice}
                        numbersOnly
                    />

                    <TextInput
                        value={context.vendor}
                        labelText={"Артикул товара"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setVendor}
                    />

                    <div className={"w-full grid grid-cols-2 gap-5"}>
                        <div className={"relative col-span-1 flex flex-col gap-[15px]"}>
                            <Text
                                className={"text-[18px] font-semibold w-full text-main-black"}
                                text={"Валюта"}
                            />
                            <SelectInput
                                options={context.options}
                                placeholder={"Валюта"}
                                activeOption={context.options[0]}
                                onSelectOption={() => console.log("Select")}
                            />
                        </div>

                        <div className={"col-span-1 flex flex-col gap-4"}>
                            <Text text={"Скидка"} className={"text-[18px] font-semibold"}/>
                            <Checkbox
                                className={"h-[52px] flex flex-col justify-center"}
                                isSelected={context.saleFlag}
                                setSelected={context.setSaleFlag}
                            />
                        </div>
                    </div>

                    <TextInput
                        value={context.saleValue}
                        labelText={"Размер скидки (в процентах)"}
                        placeholder={"Введите здесь.."}
                        rightContent={<Text text={"%"} className={"text-second-gray"}/>}
                        onChange={context.setSaleValue}
                        maxLength={3}
                        numbersOnly
                    />

                </div>

                <ProductCharacteristicBlock
                    chars={context.chars}
                    handleChangeCharMap={context.handleChangeCharMap}
                    charMap={context.charMap}
                />

                <HelperHintRow draggable items={helperHintRow}/>
                <SortableListWrapper items={context.tableItems}>
                    {
                        context.productCharTableItems.map((item, index) => (
                            <SortableWrapper id={item.orderId ?? index}>
                                <CategoryCharacteristicRow
                                    key={item.orderId}
                                    characteristic={item}
                                    rightContent={
                                        <ActionButton
                                            onClick={() => context.handleDeleteProductItem(item)}
                                        />
                                    }
                                />
                            </SortableWrapper>
                        ))
                    }
                </SortableListWrapper>
                <ProductHelperBottomRow
                    handleAddProduct={context.handleAddProductCharacteristic}
                />
                <PhotoBlock
                    photos={context.tableItems}
                    onDelete={context.handleDeletePhoto}
                    onAdd={context.handleAddPhoto}
                />
                <Button
                    buttonText={"Сохранить"}
                    onClick={context.handleSaveChanges}
                />
            </div>
        </>
    );

};

export default NewProductPage;