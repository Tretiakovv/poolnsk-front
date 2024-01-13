"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {useStore} from "@/store/store";
import Button from "@/components/atoms/buttons/button/Button";
import {useMutation} from "react-query";
import SuccessBackSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessBackSnackbar";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";

const NewSectionPage = () => {

    const [sectionName, setSectionName] = useState<string>("")
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isCreateError, setCreateError] = useState<boolean>(false)

    const addSection = useStore(state => state.addSection)

    const addSectionMutation = useMutation({
        mutationKey: ["post", "section"],
        mutationFn: (name: string) => addSection(name),
        onSuccess: () => setOpen(true),
        onError : () => setCreateError(true)
    })

    const handleAddSection = () => addSectionMutation.mutate(sectionName)

    return (
        <>
            <ErrorSnackbar
                message={"Возникла ошибка при создании раздела. Попробуйте снова."}
                isOpen={isCreateError}
                onClose={() => setCreateError(false)}
            />
            <SuccessBackSnackbar
                message={"Раздел был создан успешно! Вы можете вернуться назад."}
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            />
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
