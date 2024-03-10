"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {useNewCategoryPage} from "@/app/catalog/section/[sectionId]/new/page.hooks";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {TextItem} from "@/types/TextItem";
import Checkbox from "@/components/atoms/inputs/checkbox/Checkbox";
import Text from "@/components/atoms/text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import {Option} from "@/types/Option";
import {ValueType} from '@/types/ValueType';
import {Characteristic} from "@/types/Characteristic";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import CategoryCharacteristicRow
    from "@/components/organisms/rows/category-characteristic-row/CategoryCharacteristicRow";
import ActionButton from "@/components/atoms/buttons/delete-button/ActionButton";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";

const helperHintRow: TextItem[] = [
    {text: "Характеристика видна клиенту?"},
    {text: "Название характеристики"},
    {text: "Тип характеристики"},
]

const HelperBottomRow = ({handleAddCharacteristic}: {
    handleAddCharacteristic: (characteristic: Characteristic) => void
}) => {

    const options: Option[] = [
        {name: "STRING", value: "Строковое значение"},
        {name: "FLOAT", value: "Нецелое значение"},
        {name: "INTEGER", value: "Целое значение"},
        {name: "INVISIBLE", value: "Невидимое значение"},
    ]

    const initialState: Characteristic = {isTop: false, name: "", valueType: "INTEGER"}

    const [
        characteristic,
        setCharacteristic
    ] = useState<Characteristic>(initialState)

    const mapTypeToOption = (type: ValueType) => {
        return options.find(option => option.name === type)
    }

    const handleChangeCharacteristic = (_key: keyof Characteristic, value: any) => {
        setCharacteristic(state => {
            const newState = {...state}
            // @ts-ignore
            newState[_key] = value
            return newState
        })
    }

    return (
        <div className={"pl-[62px] w-full flex flex-row items-start gap-[20px]"}>

            <div className={"flex flex-col items-start gap-2 w-full"}>
                <Checkbox
                    className={"h-[52px] flex flex-col justify-center"}
                    isSelected={characteristic.isTop}
                    setSelected={(newVal) => handleChangeCharacteristic("isTop", newVal)}
                />
                <Text
                    className={"text-[14px] w-[350px] text-second-gray"}
                    text={"Если галочка стоит, клиент будет видеть характеристику на карточке товара"}
                />
            </div>

            <TextInput
                value={characteristic.name}
                placeholder={"Название характеристики"}
                hintText={"Не больше 70 символов, включая пробелы и знаки препинания"}
                maxLength={70}
                onChange={(newName: string) => handleChangeCharacteristic("name", newName)}
            />

            <div className={"w-full flex flex-col gap-2"}>
                <SelectInput
                    options={options}
                    activeOption={mapTypeToOption(characteristic.valueType)}
                    onSelectOption={(newVal) => handleChangeCharacteristic("valueType", newVal.name)}
                    placeholder={"Тип характеристики"}
                />
                <Text
                    className={"text-[14px] w-[260px] text-second-gray"}
                    text={"Тип будет валидировать введённое в поле значение"}
                />
            </div>

            <Button
                className={"h-[60px]"}
                icon={<FiPlus size={"20px"} className={"stroke-main-white"}/>}
                onClick={() => handleAddCharacteristic(characteristic)}
            />

        </div>
    )
}



const NewCategoryPage = ({params} : {
    params : {
        sectionId : number
    }
}) => {

    const context = useNewCategoryPage(params.sectionId)

    return (
        <>
            <ErrorSnackbar
                message={"Возникла ошибка при создании категории. Попробуйте снова."}
                isOpen={context.isCreateError}
                onClose={() => context.setCreateError(false)}
            />
            <SuccessSnackbar
                message={"Категория была создана успешно! Вы можете вернуться назад."}
                isOpen={context.isSnackbarOpen}
                onClose={() => context.setSnackbarOpen(false)}
            />
            <HeaderRow
                header={"Новая категория"}
                backIcon
            />
            <div className={"w-full flex flex-col gap-[30px] py-[30px]"}>
                <TextInput
                    value={context.name}
                    labelText={"Название категории"}
                    hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                    maxLength={110}
                    placeholder={"Введите здесь.."}
                    onChange={context.setName}
                />
                <HelperHintRow draggable items={helperHintRow}/>
                <SortableListWrapper items={context.tableItems}>
                    {
                        context.tableItems.map((item, index) => (
                            <SortableWrapper id={item.orderId ?? index}>
                                <CategoryCharacteristicRow
                                    key={item.orderId}
                                    characteristic={item}
                                    rightContent={
                                        <ActionButton
                                            onClick={() => context.handleDeleteCharacteristic(item)}
                                        />
                                    }
                                />
                            </SortableWrapper>
                        ))
                    }
                </SortableListWrapper>
                <HelperBottomRow handleAddCharacteristic={context.handleAddCharacteristic}/>
                <Button
                    buttonText={"Сохранить"}
                    onClick={context.handleSaveChanges}
                />
            </div>
        </>
    );
};

export default NewCategoryPage;
