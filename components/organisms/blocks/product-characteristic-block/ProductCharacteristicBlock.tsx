import React from 'react';
import {ResponseChar} from "@/types/ResponseChar";
import {ValueType} from "@/types/ValueType";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";

const ProductCharacteristicBlock = React.memo(({chars, charMap, handleChangeCharMap}: {
    chars: ResponseChar[],
    charMap: { id: number, value: string }[],
    handleChangeCharMap: (id: number, newVal: string) => void
}) => {

    const createHintText = (valueType : ValueType) : string => {
        const prefixString = "Введите в данное поле "
        const postfixString = valueType === "STRING" ? "строковое"
            : (valueType === "INTEGER" ? "целочисленное" : "нецелое")
        return prefixString.concat(postfixString).concat(" значение")
    }

    return (
        <div className={"w-full grid grid-cols-12 gap-5"}>
            {
                chars.map((item) => {
                    const curItem = charMap.find((curItem) => curItem.id == item.id)
                    return (
                        <TextInput
                            value={curItem?.value ?? ""}
                            labelText={item.name}
                            hintText={createHintText(item.valueType)}
                            rightContent={item.valueType}
                            placeholder={"Введите здесь.."}
                            onChange={(newVal: string) => handleChangeCharMap(item.id, newVal)}
                            numbersOnly={item.valueType !== "STRING"}
                            className={"col-span-4"}
                        />
                    )
                })
            }
        </div>
    )

})

export default ProductCharacteristicBlock;
