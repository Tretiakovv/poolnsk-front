"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {useStore} from "@/store/store";
import Button from "@/components/atoms/buttons/button/Button";
import {useMutation} from "react-query";

const NewSectionPage = () => {

    const [sectionName, setSectionName] = useState<string>("")
    const addSection = useStore(state => state.addSection)

    const addSectionMutation = useMutation({
        mutationKey : ["post", "section"],
        mutationFn : (name : string) => addSection(name)
    })

    const handleAddSection = () => addSectionMutation.mutate(sectionName)

    return (
        <>
            <HeaderRow header={"Новый раздел"} backIcon/>
            <div className={"w-full py-[30px] flex flex-col gap-[30px]"}>
                <TextInput
                    value={sectionName}
                    labelText={"Название раздела"}
                    hintText={"Не больше 60 символов, включая пробелы и знаки препинания"}
                    placeholder={"Введите здесь.."}
                    onChange={setSectionName}
                />
                <Button
                    buttonText={"Сохранить"}
                    onClick={handleAddSection}
                />
            </div>
        </>
    )

}

export default NewSectionPage;
