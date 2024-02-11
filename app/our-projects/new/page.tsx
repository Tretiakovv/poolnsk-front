"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useNewProjectPage} from "@/app/our-projects/new/page.hooks";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import PhotoInput from "@/components/atoms/inputs/photo-input/PhotoInput";
import React, {useState} from "react";
import {ourProjectsNewPageHeader} from "@/data/ourProjectsPageData";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import CategoryCharacteristicRow
    from "@/components/organisms/rows/category-characteristic-row/CategoryCharacteristicRow";
import ActionButton from "@/components/atoms/buttons/delete-button/ActionButton";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import {Option} from "@/types/Option";
import {
    FiBox,
    FiCheck,
    FiClock,
    FiCpu,
    FiInfo,
    FiMinimize2,
    FiMove,
    FiPlus,
    FiRefreshCcw,
    FiTool,
    FiTruck,
    FiZap
} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {OurProjectCharView} from "@/types/dto/OurProjectChar";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";

const HelperBottomRow = ({onAddChar}: {
    onAddChar: (projectChar: OurProjectCharView) => void
}) => {

    const options: Option[] = [
        {name: "box", value: <FiBox size={"18px"}/>},
        {name: "check", value: <FiCheck size={"18px"}/>},
        {name: "clock", value: <FiClock size={"18px"}/>},
        {name: "cpu", value: <FiCpu size={"18px"}/>},
        {name: "info", value: <FiInfo size={"18px"}/>},
        {name: "move", value: <FiMove size={"18px"}/>},
        {name: "tool", value: <FiTool size={"18px"}/>},
        {name: "zap", value: <FiZap size={"18px"}/>},
        {name: "minimize2", value: <FiMinimize2 size={"18px"}/>},
        {name: "refreshCcw", value: <FiRefreshCcw size={"18px"}/>},
        {name: "truck", value: <FiTruck size={"18px"}/>},
    ]

    const [
        activeOption,
        setActiveOption
    ] = useState<Option>(options[0])

    const [charName, setCharName] = useState<string>("")
    const [charInfo, setCharInfo] = useState<string>("")

    const handleAddChar = () => {
        const projectChar: OurProjectCharView = {
            name: charName,
            info: charInfo,
            icon: activeOption
        }
        onAddChar(projectChar)
    }

    return (
        <div className={"w-full flex flex-row gap-5"}>
            <TextInput
                value={charName}
                placeholder={"Содержание"}
                onChange={setCharName}
            />
            <TextInput
                value={charInfo}
                placeholder={"Название характеристики"}
                onChange={setCharInfo}
            />
            <SelectInput
                options={options}
                activeOption={activeOption}
                onSelectOption={setActiveOption}
                placeholder={"Выберите иконку"}
                className={"w-[300px]"}
            />
            <Button
                icon={<FiPlus size={"18px"}/>}
                onClick={handleAddChar}
                className={"h-[60px]"}
            />
        </div>
    )

}

const NewProjectPage = () => {

    const {...context} = useNewProjectPage()

    return (
        <>
            <ErrorSnackbar
                message={"Поля формы не могут быть пустыми."}
                isOpen={context.errorState}
                onClose={() => context.setErrorState(false)}
            />
            <SuccessSnackbar
                message={"Работа создана успешно! Вы можете вернуться назад"}
                isOpen={context.successState}
                onClose={() => context.setSuccessState(false)}
            />
            <HeaderRow
                backIcon
                header={`Новая работа`}
            />
            <div className={"w-full py-7 flex flex-col gap-7"}>
                <div className={"w-full flex flex-row gap-5"}>
                    <TextInput
                        value={context.nameInput.projectName}
                        labelText={"Название работы"}
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        maxLength={110}
                        placeholder={"Введите здесь.."}
                        onChange={context.nameInput.setProjectName}
                    />
                    <TextInput
                        value={context.typeInput.projectType}
                        labelText={"Вид работ"}
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        maxLength={110}
                        placeholder={"Введите здесь.."}
                        onChange={context.typeInput.setProjectType}
                    />
                    <TextInput
                        value={context.durationInput.projectDuration}
                        labelText={"Срок выполнения работ"}
                        hintText={"Не больше 110 символов, включая пробелы и знаки препинания"}
                        maxLength={110}
                        placeholder={"Введите здесь.."}
                        onChange={context.durationInput.setProjectDuration}
                    />
                    <PhotoInput
                        labelText={"Фотография"}
                        value={context.photoInput.photo}
                        onChange={context.photoInput.handleChangePhoto}
                        onClear={context.photoInput.handleClearPhoto}
                        className={"w-[300px]"}
                        hintText={"Фото должно быть не больше 5 МБ"}
                    />
                </div>
                <HelperHintRow draggable items={ourProjectsNewPageHeader}/>
                <SortableListWrapper items={context.ourProjectCharTableItems}>
                    {
                        context.ourProjectCharTableItems.map((item, index) => (
                            <SortableWrapper id={item.orderId ?? index}>
                                <CategoryCharacteristicRow
                                    key={item.orderId}
                                    characteristic={item}
                                    rightContent={
                                        <ActionButton
                                            onClick={() => context.handleDeleteOurProjectChar(item)}
                                        />
                                    }
                                />
                            </SortableWrapper>
                        ))
                    }
                </SortableListWrapper>
                <HelperBottomRow onAddChar={context.handleAddOurProjectChar}/>
                <Button buttonText={"Добавить"} onClick={context.handleAddOurProject}/>
            </div>
        </>
    );
};

export default NewProjectPage;
