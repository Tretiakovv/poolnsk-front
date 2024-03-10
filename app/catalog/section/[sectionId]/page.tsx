"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useCategoriesPage} from "@/app/catalog/section/[sectionId]/page.hooks";
import {categoryItems} from "@/data/catalogSectionHelperData";
import Button from "@/components/atoms/buttons/button/Button";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";
import dynamic from "next/dynamic";
import Loading from "@/components/atoms/loading/Loading";

const Table = dynamic(
    () => import("@/components/organisms/table/Table"),
    {loading: () => <Loading/>}
)

const CatalogCategoriesPage = ({params}: {
    params: {
        sectionId: number
    }
}) => {

    const {
        sortableCategories, getCategoriesQuery,
        handleAddCategory, handleDeleteClick, handleEditClick, handleItemClick, ...context
    } = useCategoriesPage(params.sectionId)

    if (getCategoriesQuery.isSuccess && context.getSectionsQuery.isSuccess) {
        return (
            <>
                {
                    context.itemToDelete && <InfoActionPopup
                        header={"Удаление категории"}
                        message={"Вы уверены, что хотите удалить категорию? Это действие нельзя отменить."}
                        buttonText={"Удалить категорию"}
                        onClose={() => context.setItemToDelete(undefined)}
                        action={handleDeleteClick}
                        snackbarProps={{
                            isOpen: context.deleteError,
                            onClose: () => context.setDeleteError(false),
                            message: "Чтобы удалить категорию, сначала удалите все продукты в ней."
                        }}
                    />
                }
                {
                    context.sectionToEdit !== 0 && <InfoActionPopup
                        header={"Редактирование категории"}
                        message={"Изменённое название категории увидят все пользователи сайта"}
                        buttonText={"Подтвердить изменения"}
                        onClose={() => context.selectSectionToEdit(0)}
                        onChangeName={context.handleChangeName}
                    />
                }
                <HeaderRow
                    backIcon
                    header={`Категории для раздела "${context.sectionName}"`}
                    rightContent={
                        <div className={"flex flex-row items-center gap-4"}>
                            <Button
                                buttonText={"Изменить порядок"}
                                onClick={context.handleChangeOrder}
                            />
                            <Button
                                className={"bg-second-light-blue text-black hover:text-white"}
                                buttonText={"Изменить название"}
                                onClick={() => context.selectSectionToEdit(params.sectionId)}
                            />
                        </div>
                    }
                />
                <Table
                    draggable
                    onItemClick={handleItemClick}
                    handleDragEnd={context.handleDragEnd}
                    tableHeader={categoryItems}
                    tableContent={sortableCategories}
                    editableProps={{
                        onDelete: context.setItemToDelete,
                        onEdit: () => console.log("IN PROCESS..")
                    }}
                />
                <Button
                    className={"mt-[30px]"}
                    buttonText={"Добавить категорию"}
                    onClick={handleAddCategory}
                />
            </>
        );
    }

};

export default CatalogCategoriesPage;
