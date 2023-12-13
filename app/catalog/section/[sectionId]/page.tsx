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
        handleAddCategory, handleDeleteClick, handleEditClick, handleItemClick
    } = useCategoriesPage(params.sectionId)

    if (getCategoriesQuery.isLoading) {
        return (
            <div>
                Categories is loading..
            </div>
        )
    }

    if (getCategoriesQuery.isSuccess) {
        return (
            <>
                <HeaderRow
                    backIcon
                    header={`Категории для раздела «Бассейны»`}
                />
                <Table
                    onItemClick={(itemId : number) => console.log("ID", itemId)}
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
