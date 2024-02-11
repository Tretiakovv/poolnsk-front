import React, {useState} from 'react';
import {ProductCharacteristic} from "@/types/ProductCharacteristic";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";

const ProductHelperBottomRow = ({handleAddProduct}: {
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
        <div className={"w-full flex flex-row items-start gap-[20px]"}>

            <TextInput
                value={productChar.name}
                placeholder={"Название характеристики"}
                hintText={"Не больше 70 символов, включая пробелы и знаки препинания"}
                maxLength={70}
                onChange={(newName: string) => handleChangeProductChar("name", newName)}
            />

            <TextInput
                value={productChar.text}
                placeholder={"Текст характеристики"}
                hintText={"Не больше 70 символов, включая пробелы и знаки препинания"}
                maxLength={70}
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

export default ProductHelperBottomRow;
