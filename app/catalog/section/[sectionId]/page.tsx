"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useCategoriesPage} from "@/app/catalog/section/[sectionId]/page.hooks";
import {categoryItems} from "@/data/catalogSectionHelperData";
import Button from "@/components/atoms/buttons/button/Button";
import Table from "@/components/organisms/table/Table";

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
                <HeaderRow
                    backIcon
                    header={`Категории для раздела "${context.sectionName}"`}
                />
                <Table
                    draggable
                    onItemClick={handleItemClick}
                    handleDragEnd={context.handleDragEnd}
                    tableHeader={categoryItems}
                    tableContent={sortableCategories}
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
