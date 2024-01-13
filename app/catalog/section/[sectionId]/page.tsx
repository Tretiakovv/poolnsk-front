"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useCategoriesPage} from "@/app/catalog/section/[sectionId]/page.hooks";
import {categoryItems} from "@/data/catalogSectionHelperData";
import Button from "@/components/atoms/buttons/button/Button";
import Table from "@/components/organisms/table/Table";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";

const CatalogCategoriesPage = ({params}: {
    params: {
        sectionId: number
    }
}) => {

    const {
        sortableCategories, getCategoriesQuery,
        handleAddCategory, handleDeleteClick, handleEditClick, handleItemClick, ...context
    } = useCategoriesPage(params.sectionId)

    if (getCategoriesQuery.isLoading || context.getSectionsQuery.isLoading) {
        return (
            <div>
                Categories is loading..
            </div>
        )
    }

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
                            isOpen : context.deleteError,
                            onClose : () => context.setDeleteError(false),
                            message : "Чтобы удалить категорию, сначала удалите все продукты в ней."
                        }}
                    />
                }
                <HeaderRow
                    backIcon
                    header={`Категории для раздела "${context.sectionName}"`}
                    rightContent={
                        <Button
                            buttonText={"Изменить порядок"}
                            onClick={context.handleChangeOrder}
                        />
                    }
                />
                <Table
                    draggable
                    onItemClick={handleItemClick}
                    handleDragEnd={context.handleDragEnd}
                    tableHeader={categoryItems}
                    tableContent={sortableCategories}
                    editableProps={{
                        onDelete : context.setItemToDelete,
                        onEdit : () => console.log("IN PROCESS..")
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
