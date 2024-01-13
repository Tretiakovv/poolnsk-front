"use client"

import {useNewProductPage} from "@/app/catalog/section/[sectionId]/category/[categoryId]/new/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import Button from "@/components/atoms/buttons/button/Button";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import Text from "@/components/atoms/text/Text";
import Checkbox from "@/components/atoms/inputs/checkbox/Checkbox";
import {TextItem} from "@/types/TextItem";
import {FiPlus} from "react-icons/fi";
import React, {useState} from "react";
import {ProductCharacteristic} from "@/types/ProductCharacteristic";
import PhotoBlock from "@/components/organisms/blocks/photo-block/PhotoBlock";
import {ResponseChar} from "@/types/ResponseChar";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import CategoryCharacteristicRow
    from "@/components/organisms/rows/category-characteristic-row/CategoryCharacteristicRow";
import DeleteButton from "@/components/atoms/buttons/delete-button/DeleteButton";
import SuccessBackSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessBackSnackbar";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";

const helperHintRow: TextItem[] = [
    {text: "Дополнительная характеристика товара"},
    {text: "Текст характеристики"},
]

const HelperBottomRow = ({handleAddProduct}: {
    handleAddProduct: (productCharacteristic: ProductCharacteristic) => void
}) => {

    const [
        productChar,
        setProductChar
    ] = useState<ProductCharacteristic>({name: "", text: ""})

    const handleChangeProductChar = (key: keyof ProductCharacteristic, value: string) => {
        setProductChar(state => {
            const newState = {...state}
            newState[key] = value
            return newState
        })
    }

    return (
        <div className={"pl-[62px] w-full flex flex-row items-start gap-[20px]"}>

            <TextInput
                value={productChar.name}
                placeholder={"Название характеристики"}
                hintText={"Не больше 70 символов, включая пробелы и знаки препинания"}
                onChange={(newName: string) => handleChangeProductChar("name", newName)}
            />

            <TextInput
                value={productChar.text}
                placeholder={"Текст характеристики"}
                hintText={"Не больше 70 символов, включая пробелы и знаки препинания"}
                onChange={(newText: string) => handleChangeProductChar("text", newText)}
            />

            <Button
                className={"h-[60px]"}
                icon={<FiPlus size={"20px"} className={"stroke-main-white"}/>}
                onClick={() => handleAddProduct(productChar)}
            />

        </div>
    )
}

const ProductCharacteristicsBlock = ({chars, charMap, handleChangeCharMap}: {
    chars: ResponseChar[],
    charMap: { id: number, value: string }[],
    handleChangeCharMap: (id: number, newVal: string) => void
}) => {
    return (
        <div className={"w-full grid grid-cols-12 gap-5"}>
            {
                chars.map((item) => {
                    const curItem = charMap.find((curItem) => curItem.id == item.id)
                    return (
                        <TextInput
                            value={curItem?.value ?? ""}
                            labelText={item.name}
                            hintText={"Это обязательная характеристика категории"}
                            placeholder={"Введите здесь.."}
                            onChange={(newVal: string) => handleChangeCharMap(item.id, newVal)}
                            className={"col-span-4"}
                        />
                    )
                })
            }
        </div>
    )

}

const NewProductPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const context = useNewProductPage(params.sectionId, params.categoryId)

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
            <SuccessBackSnackbar
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
                        placeholder={"Введите здесь.."}
                        onChange={context.setName}
                    />
                    <TextInput
                        value={context.info}
                        labelText={"Описание товара"}
                        hintText={"Не больше 330 символов, включая пробелы и знаки препинания"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setInfo}
                    />
                    <TextInput
                        disabled
                        value={context.link}
                        labelText={"Ссылка на товар конкурента"}
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setLink}
                    />
                </div>

                <div className={"w-full flex flex-row gap-5 pb-10 border-b-2 border-second-light-blue"}>

                    <TextInput
                        value={context.price}
                        labelText={"Цена товара"}
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setPrice}
                    />

                    <div className={"w-full grid grid-cols-2 gap-5"}>
                        <div className={"col-span-1 flex flex-col gap-2"}>
                            <SelectInput
                                options={context.options}
                                placeholder={"Валюта"}
                                activeOption={context.options[0]}
                                onSelectOption={() => console.log("Select")}/>
                            <Text
                                className={"text-[14px] w-full text-second-gray"}
                                text={"Цена товара будет в этой валюте"}
                            />
                        </div>

                        <div className={"col-span-1 flex flex-col gap-4"}>
                            <Text text={"Есть ли скидка?"} className={"text-[18px] font-semibold"}/>
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
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        placeholder={"Введите здесь.."}
                        onChange={context.setSaleValue}
                    />

                </div>

                <ProductCharacteristicsBlock
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
                                        <DeleteButton
                                            onClick={() => context.handleDeleteProductItem(item)}
                                        />
                                    }
                                />
                            </SortableWrapper>
                        ))
                    }
                </SortableListWrapper>
                <HelperBottomRow
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